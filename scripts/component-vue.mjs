import {
  reactKinds,
  reactPropsOf,
  resolveReactProp,
} from "./example-react-props.mjs"
import { VOID_ELEMENTS } from "./html-tokens.mjs"
import {
  componentImport,
  contextImports,
  devOnly,
  edgeTrimmed,
  eventRoots,
  hydratingRoots,
  indent,
  isLoose,
  objectCode,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  scriptImports,
  styleOption,
  withImport,
} from "./component-emit.mjs"
import {
  bindingFor,
  helpersCalled,
  helpersOf,
  isCheckedAttribute,
  namesFrom,
} from "./component-models.mjs"
import { markupAttribute } from "./example-encoders.mjs"
import { emitsTypeOf } from "./component-types.mjs"
import { allValues, scriptValues, valuesIn } from "./component-analysis.mjs"
import {
  byName,
  chosenSpreadCode,
  classMayBeEmpty,
  elementsIn,
  filtersRest,
  isBlank,
  itemBinding,
  onlyClass,
  PRESERVED_TAGS,
  propKey,
  staticClass,
  unsupported,
  withoutClassEntry,
} from "./component-shared.mjs"

const vueSlot = (name) => (name.includes("-") ? `['${name}']` : `.${name}`)

const declaredProp = (name) =>
  name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())

const ATTRIBUTE = /[^\s="]+(?:="[^"]*")?/g

const withoutUnused = (lines, markup, declarations) => {
  const unused = declarations.find(
    ({ line, name }) =>
      lines.includes(line) &&
      ![markup, ...lines.filter((other) => other !== line)].some((text) =>
        new RegExp(`(?<![\\w$.])${name.replaceAll("$", "\\$")}(?![\\w$])`).test(
          text,
        ),
      ),
  )
  return unused
    ? withoutUnused(
        lines.filter((line) => line !== unused.line),
        markup,
        declarations,
      )
    : lines
}
const CLASS_BINDING = /^:class="(.*)"$/s
const STYLE_BINDING = /^:style="(.*)"$/s
const OBJECT_BINDING = /^v-bind="(.*)"$/s

const emptyBindings = (attributes) =>
  attributes.flatMap((entry, at) => {
    const classCode = CLASS_BINDING.exec(entry)?.[1]
    if (classCode !== undefined) {
      return classMayBeEmpty(classCode)
        ? [{ at, code: `classAttrs(${classCode})`, helper: "classAttrs" }]
        : []
    }
    const styleCode = STYLE_BINDING.exec(entry)?.[1]
    return styleCode === undefined
      ? []
      : [{ at, code: `styleAttrs(${styleCode})`, helper: "styleAttrs" }]
  })

const omitEmptyAttributes = (attributes, file) => {
  const omitted = emptyBindings(attributes)
  if (omitted.length === 0) return { attributes, helpers: [] }
  const bound = attributes.filter((entry) => OBJECT_BINDING.test(entry))
  if (bound.length > 1) {
    throw unsupported(
      "BC501",
      file,
      `a class list or style that can be empty next to ${bound.length} v-bind objects`,
    )
  }
  const codes = omitted.map(({ code }) => code)
  const helpers = omitted.map(({ helper }) => helper)
  const spread = bound.length ? OBJECT_BINDING.exec(bound[0])[1].trim() : ""
  const entries = /^\{[\s\S]*\}$/.test(spread)
    ? spread.slice(1, -1).trim().replace(/,$/, "")
    : `...${spread}`
  const place = bound.length ? attributes.indexOf(bound[0]) : omitted[0].at
  const merged = [
    ...omitted,
    {
      at: place,
      code: spread,
    },
  ]
    .toSorted((a, b) => a.at - b.at)
    .map(({ code }) => code)
  const object = !bound.length
    ? codes.length === 1
      ? `v-bind="${codes[0]}"`
      : `v-bind="{ ${codes.map((code) => `...${code}`).join(", ")} }"`
    : helpers.includes("styleAttrs")
      ? `v-bind="mergeProps(${merged.join(", ")})"`
      : `v-bind="{ ${entries}, ${codes.map((code) => `...${code}`).join(", ")} }"`
  const dropped = new Set(omitted.map(({ at }) => at))
  return {
    attributes: attributes
      .map((entry, index) => (index === place ? object : entry))
      .filter((_, index) => index === place || !dropped.has(index)),
    helpers: [
      ...helpers,
      ...(bound.length && helpers.includes("styleAttrs") ? ["mergeProps"] : []),
    ],
  }
}

export const toVue = (component) => {
  const {
    components,
    derived,
    imports,
    props,
    propsType,
    provide,
    reads,
    rest,
    restOnRoot,
    rootElements,
    slots,
    tree,
    trimmedSlots,
    uid,
    variableTags,
    warnings,
  } = component
  const model = bindingFor(component, "vue")
  const values = allValues(component)
  const used = new Set([
    ...values.flatMap(({ reads }) => [...reads.names.keys()]),
    ...variableTags,
  ])
  const usedInScript = new Set(
    scriptValues(component).flatMap(({ reads }) => [...reads.names.keys()]),
  )
  const attrsOnInner = !restOnRoot
  const { chosenRest, multiRoot } = component
  const allAttrs = multiRoot || chosenRest
  const computedAttrs = attrsOnInner && !allAttrs
  const attributeProps = props.filter(
    ({ local, prop }) => prop.includes("-") && used.has(local),
  )
  const restUsed =
    values.some(({ code, reads }) => code !== rest && reads.rest) ||
    attributeProps.length > 0
  if (attrsOnInner && values.some(({ code }) => /\bmergeStyle\(/.test(code))) {
    throw unsupported(
      "BC502",
      component.file,
      `mergeStyle with ${rest} on an inner element`,
    )
  }
  const classProp = props.find(({ prop }) => prop === "class")
  const classInScript = classProp && usedInScript.has(classProp.local)
  const getters = new Set(
    derived
      .filter(({ fn, readsSlot }) => !fn && readsSlot)
      .map(({ name }) => name),
  )
  const providedReader = provide?.value.find(({ readsSlot }) => readsSlot)
  if (providedReader) {
    throw unsupported(
      "BC403",
      component.file,
      `the provided \`${providedReader.key}\`, which reads a slot`,
      "Vue doesn't track slots, so a provided value can't follow one: provide a prop instead",
    )
  }
  const rename = new Map([
    ...props.flatMap(({ local, prop }) =>
      prop === "class"
        ? [[local, "$attrs.class"]]
        : prop === "style"
          ? [[local, "$attrs.style"]]
          : prop.includes("-")
            ? [[local, `attrs['${prop}']`]]
            : [],
    ),
    ...(restUsed ? [[rest, "attrs"]] : []),
    ...trimmedSlots.map(({ local, slot }) => [local, `$slots${vueSlot(slot)}`]),
    ...[...getters].map((name) => [name, `${name}()`]),
    ...model.rename.map(([local, code]) => [
      local,
      code.replace(/\.value$/, ""),
    ]),
  ])
  const computedConsts = derived.filter(
    ({ fn, name }) => !fn && !getters.has(name),
  )
  const derivedNames = new Set(computedConsts.map(({ name }) => name))
  const events = component.events ?? []
  const listened = eventRoots(component)
  const hydrating = hydratingRoots(component, listened)
  if (events.length > 0 && used.has("emit")) {
    throw unsupported(
      "BC301",
      component.file,
      "the name `emit`, which the Vue port also declares for its events",
      "rename the prop or const in the Astro file",
    )
  }
  const pairedRoot = rootElements.find(
    (node) =>
      !node.component &&
      !node.custom &&
      !node.variable &&
      model.attributes(node, {}).bound !== undefined,
  )
  const explicitAttrs = pairedRoot !== undefined
  const filteredAttrs =
    restOnRoot && attributeProps.length > 0 && !explicitAttrs
  const definedRoot =
    restOnRoot &&
    !explicitAttrs &&
    !filteredAttrs &&
    rootElements.some((node) =>
      node.attributes.some(
        (item) =>
          item.condition === undefined &&
          filtersRest(node, item, component, declaredProp),
      ),
    )
  const componentRoot =
    restOnRoot &&
    !explicitAttrs &&
    !filteredAttrs &&
    !definedRoot &&
    rootElements.some(
      (node) =>
        node.component &&
        node.attributes.some(
          (item) => item.kind === "spread" && item.code === rest,
        ),
    )
  const inheritsAttrs = !(
    attrsOnInner ||
    explicitAttrs ||
    filteredAttrs ||
    definedRoot ||
    componentRoot
  )
  if (classInScript && !inheritsAttrs) {
    throw unsupported(
      "BC504",
      component.file,
      `\`${classProp.local}\` in the frontmatter of a component that passes its attributes to an inner element`,
      "read it in the template",
    )
  }
  const callerClass = (node, { code, reads: classReads }) => {
    if (!classProp || !inheritsAttrs || !rootElements.includes(node)) {
      return code
    }
    const { code: kept, dropped } = withoutClassEntry(code, classProp.local)
    if (!dropped && classReads.names.has(classProp.local)) {
      throw unsupported(
        "BC504",
        component.file,
        `a class list on the root that reads \`${classProp.local}\` without ending in it`,
        `end the list in \`${classProp.local}\``,
      )
    }
    return kept
  }
  const scriptRename = new Map([
    ...rename,
    ...(classInScript ? [[classProp.local, "attrs.class"]] : []),
    ...(!inheritsAttrs && restUsed ? [[rest, "attrs.value"]] : []),
    ...(!inheritsAttrs
      ? attributeProps.map(({ local, prop }) => [
          local,
          `attrs.value['${prop}']`,
        ])
      : []),
    ...computedConsts.map(({ name }) => [name, `${name}.value`]),
    ...trimmedSlots.map(({ local, slot }) => [local, `slots${vueSlot(slot)}`]),
    ...model.rename,
  ])
  const template = {
    quote: "'",
    rename,
    ids: component.ids,
    slotHas: (name) => `$slots${vueSlot(name)}`,
    style: styleOption(component, "{}"),
  }
  const script = {
    rename: scriptRename,
    ids: component.ids,
    slotHas: (name) => `slots${vueSlot(name)}`,
    style: styleOption(component, "{}"),
  }
  const { generic } = model
  const forwarded = (component.baseProps ?? [])
    .filter(
      (key) =>
        key !== "class" &&
        key !== "style" &&
        key !== component.model?.prop &&
        !props.some((entry) => entry.prop === key),
    )
    .toSorted(byName)
  const castsToFalse = (prop) => {
    if (!component.element || component.baseProps?.includes(prop)) return false
    const attributes = reactPropsOf(component.element, false) ?? new Map()
    return reactKinds(
      attributes,
      resolveReactProp(attributes, prop) ?? prop,
    ).has("boolean")
  }
  const declared = [
    ...forwarded.map((key) => ({ prop: key, text: key })),
    ...props
      .filter(
        ({ local, prop }) =>
          prop !== "class" &&
          prop !== "style" &&
          !prop.includes("-") &&
          !model.props.dropped.includes(prop) &&
          (used.has(local) ||
            prop === component.model?.prop ||
            model.props.added.includes(prop)),
      )
      .map(({ default: fallback, local, prop }) => ({
        prop,
        text: `${local === prop ? prop : `${propKey(prop)}: ${local}`}${
          fallback
            ? ` = ${fallback}`
            : model.props.unset.includes(prop) || castsToFalse(prop)
              ? " = undefined"
              : ""
        }`,
      })),
  ]
    .toSorted((a, b) => byName(a.prop, b.prop))
    .map(({ text }) => text)
  const slotsInScript = scriptValues(component).some(
    ({ reads }) => reads.slots.length > 0,
  )
  let usesTrimmedSlot = false
  const attributeHelpers = new Set()
  let usesDefined = false
  const filteredSpread = (node, item, code) => {
    if (!filtersRest(node, item, component, declaredProp)) return code
    usesDefined = true
    return `defined(${code})`
  }
  const definedSpread = (item, code) => {
    if (item.defined !== true) return code
    usesDefined = true
    return `defined(${code})`
  }
  const attribute = (node, item, scope) => {
    if (item.kind === "class") {
      const code = callerClass(node, item)
      if (code === undefined) return ""
      const text = code === item.code ? undefined : staticClass(code)
      return text === undefined
        ? `:class="${rewriteExpression(onlyClass(code) ?? code, scope)}"`
        : markupAttribute("class", text, false, '"')
    }
    if (item.kind === "spread") {
      if (item.code === rest && item.condition !== undefined) {
        return `v-bind="${filteredSpread(node, item, chosenSpreadCode(item, "attrs", rewriteExpression(item.condition, scope)))}"`
      }
      if (item.code === rest) {
        const bound = forwarded.map((key) => `:${key}="${key}"`)
        const object =
          rootElements.includes(node) && !explicitAttrs
            ? filteredAttrs
              ? "restAttrs"
              : definedRoot
                ? "attrs"
                : componentRoot && node.component
                  ? "attrs"
                  : undefined
            : "attrs"
        return [
          ...(object ? [`v-bind="${filteredSpread(node, item, object)}"`] : []),
          ...bound,
        ].join(" ")
      }
      return `v-bind="${definedSpread(item, rewriteExpression(item.code, scope))}"`
    }
    if (item.kind === "static") {
      return markupAttribute(item.name, item.value, false, '"')
    }
    if (item.kind === "boolean") return item.name
    if (rootElements.includes(node) && inheritsAttrs && item.reads.rest) {
      throw unsupported(
        "BC503",
        component.file,
        `the attribute \`${item.name}\` on the root element, which reads \`${rest}\``,
        "Vue merges the attributes that fall through after it, so the caller's value wins: destructure the prop in the Astro file",
      )
    }
    return `:${item.name}="${rewriteExpression(item.code, scope)}"`
  }
  const directive = (nodes, name, test, scope) => {
    const significant = nodes.filter((node) => !isBlank(node))
    const clause = test === undefined ? name : `${name}="${test}"`
    if (significant.length === 1 && significant[0].type !== "if") {
      return emitOne(significant[0], clause, scope)
    }
    return `<template ${clause}>${body(nodes, scope)}</template>`
  }
  const emitOne = (node, clause, scope) => {
    if (node.type === "text") {
      return node.value === " " || node.inline ? '{{ " " }}' : node.value
    }
    if (node.type === "expression") {
      const code = rewriteExpression(node.code, scope)
      return clause
        ? `<template ${clause}>{{ ${code} }}</template>`
        : `{{ ${code} }}`
    }
    if (node.type === "slot") {
      const slotClause = clause ? ` ${clause}` : ""
      if (node.trimmed) {
        usesTrimmedSlot = true
        return `<TrimmedSlot${slotClause} :nodes="$slots${vueSlot(node.name)}?.()" />`
      }
      const name = node.name === "default" ? "" : ` name="${node.name}"`
      if (node.fallback.length === 0) return `<slot${slotClause}${name}></slot>`
      const pair = `<slot v-if="$slots${vueSlot(node.name)}"${name}></slot>\n${directive(node.fallback, "v-else", undefined, scope)}`
      return clause ? `<template ${clause}>${pair}</template>` : pair
    }
    if (node.type === "if") {
      const test = rewriteExpression(node.test, scope)
      const consequent = directive(node.consequent, "v-if", test, scope)
      if (!node.alternate) return consequent
      return `${consequent}\n${directive(node.alternate, "v-else", undefined, scope)}`
    }
    if (node.type === "each") {
      const rows = rowsOf(node, scope)
      const declared = new Set([...(scope.declared ?? []), ...node.declares])
      const inner = rows
        ? { ...scope, declared }
        : {
            ...scope,
            declared,
            rename: new Map([
              ...scope.rename,
              ...node.consts.map(({ code, name }) => [
                name,
                rewriteExpression(code, scope),
              ]),
            ]),
          }
      const root = node.children.find((child) => !isBlank(child))
      const item = rows?.item ?? node.item
      const list = rows?.name ?? rewriteExpression(node.list, scope)
      const loop = `v-for="${node.index ? `(${item}, ${node.index})` : item} in ${list}" :key="${node.index}"`
      return emitOne(root, loop, inner)
    }
    const modelAttributes = model.attributes(node, {
      rewrite: (code) => rewriteExpression(code, scope),
    })
    const ownChecked = modelAttributes.checked
      ? node.attributes.find(isCheckedAttribute)
      : undefined
    const ownAttributes = node.attributes.filter((item) => item !== ownChecked)
    const spreads = ownAttributes.filter(
      (item) =>
        item.kind === "spread" &&
        !(
          item.code === rest &&
          item.condition === undefined &&
          rootElements.includes(node) &&
          !definedRoot
        ),
    )
    const first = ownAttributes.indexOf(spreads[0])
    const last = ownAttributes.indexOf(spreads.at(-1))
    const merged = (item) => {
      if (item.kind === "spread") {
        return {
          spread:
            item.code === rest
              ? filteredSpread(
                  node,
                  item,
                  item.condition === undefined
                    ? "attrs"
                    : chosenSpreadCode(
                        item,
                        "attrs",
                        rewriteExpression(item.condition, scope),
                      ),
                )
              : definedSpread(item, rewriteExpression(item.code, scope)),
        }
      }
      if (item.kind === "static") {
        return {
          code: rewriteExpression(JSON.stringify(item.value), scope),
          key: item.name,
        }
      }
      if (item.kind === "boolean") return { code: "true", key: item.name }
      if (item.kind === "expression") {
        return { code: rewriteExpression(item.code, scope), key: item.name }
      }
      throw unsupported(
        "BC501",
        component.file,
        `a class list between two spreads on <${node.tag}>`,
      )
    }
    const bound =
      spreads.length > 1
        ? [
            ...ownAttributes.slice(0, first),
            {
              kind: "bound",
              text: `v-bind="${objectCode(
                ownAttributes.slice(first, last + 1).map(merged),
                { quote: "'", shorthand: false },
              )}"`,
            },
            ...ownAttributes.slice(last + 1),
          ]
        : ownAttributes
    const bindScope = modelAttributes.rename.length
      ? {
          ...scope,
          rename: new Map([...scope.rename, ...modelAttributes.rename]),
        }
      : scope
    const own = ownChecked && {
      code: rewriteExpression(ownChecked.code, bindScope),
      name: "checked",
    }
    const withOwn = (listed, entry) => {
      if (entry === undefined) return listed
      usesDefined = true
      const own = `defined({ ${entry.name === entry.code ? entry.name : `${entry.name}: ${entry.code}`} })`
      const at = listed.findIndex((entry) => OBJECT_BINDING.test(entry))
      if (at === -1) return [...listed, `v-bind="${own}"`]
      const spread = OBJECT_BINDING.exec(listed[at])[1]
      return listed.map((entry, index) =>
        index === at ? `v-bind="{ ...${own}, ...${spread} }"` : entry,
      )
    }
    const restAt = bound.findIndex(
      (entry) => entry.kind === "spread" && entry.code === rest,
    )
    const listedFor = (first, extra, checked) =>
      withOwn(
        [
          ...(first ? [first] : []),
          ...bound
            .flatMap((entry, index) => [
              ...(index === restAt ? modelAttributes.rest : []),
              entry.kind === "bound"
                ? entry.text
                : attribute(node, entry, bindScope),
            ])
            .filter(Boolean),
          ...(restAt === -1 ? modelAttributes.rest : []),
          ...extra,
          ...modelAttributes.end,
          ...(listened.includes(node)
            ? events.map((event) => `@${event}="emit('${event}', $event)"`)
            : []),
          ...(hydrating.has(node)
            ? [
                hydrating.get(node)
                  ? `:data-hydrating="${scope.rename.get(hydrating.get(node)) ?? hydrating.get(node)}.includes('-') ? '' : undefined"`
                  : 'data-hydrating=""',
                "v-hydrated",
              ]
            : []),
          ...((rootElements.includes(node) ||
            (multiRoot &&
              node.attributes.some(
                (entry) => entry.kind === "spread" && entry.code === rest,
              ))) &&
          !inheritsAttrs &&
          !node.attributes.some((entry) => entry.kind === "class")
            ? [':class="$attrs.class"']
            : []),
        ].flatMap((entry) => entry.match(ATTRIBUTE) ?? []),
        checked,
      )
    const render = (listed) => {
      const omitted = omitEmptyAttributes(listed, component.file)
      for (const helper of omitted.helpers) attributeHelpers.add(helper)
      const attributes = omitted.attributes.join(" ")
      const tag = node.variable || node.custom ? "component" : node.tag
      const is = node.variable
        ? ` :is="${scope.rename.get(node.tag) ?? node.tag}"`
        : node.custom
          ? ` is="${node.tag}"`
          : ""
      const open = `<${tag}${is}${attributes ? ` ${attributes}` : ""}`
      if (
        node.children.length === 0 &&
        (node.component ||
          node.variable ||
          node.foreign ||
          VOID_ELEMENTS.has(node.tag))
      ) {
        return `${open} />`
      }
      return `${open}>${body(node.children, {
        ...scope,
        preserved: scope.preserved || PRESERVED_TAGS.has(node.tag),
      })}</${tag}>`
    }
    const pair = modelAttributes.bound
    if (!pair) return render(listedFor(clause, []))
    const both = `${render(
      listedFor(`v-if="${pair.condition}"`, pair.attributes),
    )}\n${render(listedFor("v-else", [], own))}`
    return clause ? `<template ${clause}>${both}</template>` : both
  }
  const emit = (nodes, scope) =>
    nodes
      .map((node, index) =>
        emitOne(node, undefined, {
          ...scope,
          hugged: [nodes[index - 1], nodes[index + 1]].some(
            (sibling) => sibling && !isLoose(sibling),
          ),
        }),
      )
      .join("")
  const rowLists = []
  const rowsOf = (node, scope) => {
    const loopValues = [...node.consts, ...valuesIn(node.children)]
    const tags = elementsIn(node.children)
      .filter((element) => element.variable)
      .map((element) => element.tag)
    const reads = (name) =>
      loopValues.reduce(
        (total, value) => total + (value.reads.names.get(name) ?? 0),
        tags.filter((tag) => tag === name).length,
      )
    if (!node.consts.some(({ name }) => reads(name) > 1)) return undefined
    const inTemplate = [node, ...node.consts].some(
      (value) =>
        value.readsSlot ||
        value.reads.loop.some((name) => scope.declared?.has(name)),
    )
    if (inTemplate) return undefined
    const binding = itemBinding(node.item)
    if (!binding) {
      throw unsupported(
        "BC203",
        component.file,
        `the loop item \`${node.item}\`, whose consts the Vue port computes once per row`,
        "take the item as one name, or as an object pattern of plain names",
      )
    }
    const declared = new Set([
      ...(binding.name ? [binding.name] : []),
      ...binding.fields.map(({ local }) => local),
      ...(binding.rest ? [binding.rest] : []),
      ...node.consts.map(({ name }) => name),
      node.index,
    ])
    const free = (bases) => {
      const found = bases.find((base) => !used.has(base) && !declared.has(base))
      if (!found) {
        throw unsupported(
          "BC301",
          component.file,
          `the names ${bases.join(", ")}`,
          "rename one: the Vue port declares it for the rows of a loop",
        )
      }
      return found
    }
    const name = free([
      "rows",
      ...(/^[A-Za-z_$][\w$]*$/.test(node.list.trim())
        ? [`${node.list.trim()}Rows`]
        : []),
      `rows${rowLists.length + 1}`,
    ])
    used.add(name)
    const key = free(["item", "entry", "row"])
    const readInConsts = (local) =>
      node.consts.some(({ reads: constReads }) => constReads.names.has(local))
    const fields = binding.fields.filter(({ local }) => readInConsts(local))
    const pattern = binding.name
      ? undefined
      : binding.rest && readInConsts(binding.rest)
        ? node.item
        : fields.length
          ? `{ ${fields.map(({ key: field, local }) => (field === local ? local : `${field}: ${local}`)).join(", ")} }`
          : undefined
    const parameter = binding.name ?? key
    const rowScope = {
      ...script,
      rename: new Map(
        [...script.rename].filter(([local]) => !declared.has(local)),
      ),
    }
    const usesIndex = node.consts.some(({ reads: constReads }) =>
      constReads.names.has(node.index),
    )
    const entries = [
      ...node.consts.map(({ name: local }) => local),
      binding.name && binding.name !== key ? `${key}: ${binding.name}` : key,
    ].toSorted(byName)
    rowLists.push(
      `const ${name} = computed(() =>\n  ${rewriteExpression(node.list, script)}${node.optional ? "?." : "."}map((${parameter}${usesIndex ? `, ${node.index}` : ""}) => {\n${[
        ...(pattern ? [`const ${pattern} = ${parameter}`] : []),
        ...node.consts.map(
          ({ code, name: local }) =>
            `const ${local} = ${rewriteExpression(code, rowScope)}`,
        ),
        `return { ${entries.join(", ")} }`,
      ]
        .map((line) => `    ${line}\n`)
        .join("")}  }),\n)`,
    )
    return {
      item: `{ ${[
        ...node.consts.map(({ name: local }) => local),
        `${key}: ${node.item}`,
      ]
        .toSorted(byName)
        .join(", ")} }`,
      name,
    }
  }
  const body = (nodes, scope) => {
    const inner =
      scope.preserved || scope.hugged
        ? undefined
        : edgeTrimmed(nodes, { interpolated: false })
    return inner ? `\n${emit(inner, scope)}\n` : emit(nodes, scope)
  }
  const markup = emit(tree, template)
  const slotsType =
    propsType !== "Props" &&
    (component.folderSlots || slots.some((slot) => slot !== "default"))
      ? `${component.name}Slots`
      : "Slots"
  const emitsType = emitsTypeOf(propsType)
  const provided = provide
    ? model.context.map(
        ({ code, key, text }) =>
          text ??
          (derivedNames.has(code)
            ? code === key
              ? key
              : `${key}: ${code}`
            : `${key}: computed(() => ${rewriteExpression(code, script)})`),
      )
    : undefined
  const vueProps = generic ? `Props & ${generic.props}` : "Props"
  const propsLine = `${generic ? `${generic.type}\n\n` : ""}${
    declared.length
      ? `const { ${declared.join(", ")} } = defineProps<${vueProps}>()`
      : `defineProps<${vueProps}>()`
  }`
  const slotsLine = slotsInScript
    ? `const slots = defineSlots<${slotsType}>()`
    : `defineSlots<${slotsType}>()`
  const declarations = derived.map(({ code, fn, name }) => ({
    line: fn
      ? `const ${name} = ${rewriteExpression(code, script)}`
      : getters.has(name)
        ? `const ${name} = () => ${rewriteExpression(code, script)}`
        : `const ${name} = computed(() => ${rewriteExpression(code, script)})`,
    name,
  }))
  const modelScript = model.script((code) => rewriteExpression(code, script))
  const statements = [
    ...(filteredAttrs
      ? [
          `const restAttrs = computed(() => {\n  const { ${attributeProps.map(({ local, prop }) => `${JSON.stringify(prop)}: _${local}, `).join("")}...rest } = attrs.value\n  return rest\n})`,
        ]
      : []),
    ...modelScript.before,
    ...reads.map(
      ({ context, name }) =>
        `const ${name} = inject(${context.name}Key, undefined)`,
    ),
    ...(uid ? ["const uid = useId()"] : []),
    ...declarations.map(({ line }) => line),
    ...rowLists,
    ...warnings.map(({ code }) => devOnly(rewriteStatement(code, script))),
    ...modelScript.after,
    ...(provide
      ? [
          `provide(${provide.context.name}Key, reactive({ ${provided.join(", ")} }))`,
        ]
      : []),
  ]
  const called = helpersCalled(
    withoutUnused(statements, markup, declarations).join("\n"),
    helpersOf(model),
  )
  const vueHelpers = [
    ...(computedAttrs
      ? ["useInputAttrs"]
      : inheritsAttrs
        ? []
        : ["useRestAttrs"]),
    ...namesFrom(called, "../vue"),
    ...(hydrating.size ? ["vHydrated"] : []),
  ].toSorted(byName)
  const plainAttrs =
    inheritsAttrs &&
    (allAttrs || explicitAttrs || restUsed || definedRoot || classInScript)
  const typedAttrs =
    plainAttrs &&
    !explicitAttrs &&
    (/(?<![$\w.])attrs[.[]/.test(markup) ||
      withoutUnused(statements, markup, declarations).some((code) =>
        /(?<![$\w.])attrs(?![$\w])/.test(
          code.replaceAll("Object.entries(attrs)", ""),
        ),
      ))
  const vueImports = [
    ...(withoutUnused(statements, markup, declarations).some((code) =>
      /(?<![$\w.])computed\(/.test(code),
    )
      ? ["computed"]
      : []),
    ...(reads.length ? ["inject"] : []),
    ...(provide ? ["provide", "reactive"] : []),
    ...(explicitAttrs
      ? ["type IntrinsicElementAttributes"]
      : typedAttrs
        ? ["type HTMLAttributes", "useAttrs"]
        : plainAttrs
          ? ["useAttrs"]
          : []),
    ...(attributeHelpers.has("mergeProps") ? ["mergeProps"] : []),
    ...namesFrom(called, "vue"),
    ...(uid ? ["useId"] : []),
  ].toSorted((a, b) => byName(a.replace(/^type /, ""), b.replace(/^type /, "")))
  const importLines = [
    ...scriptImports(component),
    ...(vueImports.length
      ? [`import { ${vueImports.join(", ")} } from "vue"`]
      : []),
    ...(vueHelpers.length
      ? [`import { ${vueHelpers.join(", ")} } from "../vue"`]
      : []),
    ...(usesTrimmedSlot
      ? [`import { TrimmedSlot } from "../whitespace.vue"`]
      : []),
    ...components
      .map((entry) => componentImport(entry, ".vue"))
      .toSorted(byName),
    ...contextImports(component, "vue", {
      provide: (name) => `${name}Key`,
      read: (name) => `${name}Key`,
    }),
    ...[
      ...(usesDefined ? [["../attrs", "defined"]] : []),
      ...(warnings.length ? [["../dev", "DEV"]] : []),
      ...model.helpers.always,
      ...(attributeHelpers.has("classAttrs") ? [["../cx", "classAttrs"]] : []),
      ...(attributeHelpers.has("styleAttrs")
        ? [["../style", "styleAttrs"]]
        : []),
    ].reduce(
      (lines, [module, name]) => withImport(lines, module, name),
      imports,
    ),
    propsImport(propsType, "types.vue-props", [
      ...(events.length ? [emitsType] : []),
      ...(slots.length ? [slotsType] : []),
    ]),
  ]
  const setup = [
    importLines.join("\n"),
    [
      propsLine,
      ...(slots.length ? [slotsLine] : []),
      ...(events.length ? [`const emit = defineEmits<${emitsType}>()`] : []),
    ].join("\n"),
    ...(inheritsAttrs ? [] : ["defineOptions({\n  inheritAttrs: false,\n})"]),
    ...(computedAttrs
      ? ["const attrs = useInputAttrs()"]
      : explicitAttrs
        ? [
            `const attrs = useRestAttrs<IntrinsicElementAttributes[${JSON.stringify(pairedRoot.tag)}]>()`,
          ]
        : !inheritsAttrs
          ? ["const attrs = useRestAttrs()"]
          : typedAttrs
            ? ["const attrs = useAttrs() as HTMLAttributes"]
            : plainAttrs
              ? ["const attrs = useAttrs()"]
              : []),
    ...statements,
  ]
  const kept = withoutUnused(setup, markup, declarations)
  return `<script setup lang="ts"${generic ? ` generic="${generic.parameter}"` : ""}>\n${kept.join("\n\n")}\n</script>\n\n<template>\n${indent(markup, 2)}\n</template>\n`
}
