import {
  reactKinds,
  reactPropsOf,
  resolveReactProp,
} from "./example-react-props.mjs"
import { VOID_ELEMENTS } from "./html-tokens.mjs"
import {
  componentImport,
  contextImports,
  edgeTrimmed,
  eventRoots,
  groupWarning,
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
  helpersCalled,
  MODEL_KINDS,
  modelHelpers,
  namesFrom,
} from "./component-models.mjs"
import { markupAttribute } from "./example-encoders.mjs"
import { emitsTypeOf } from "./component-types.mjs"
import {
  allCodes,
  byName,
  chosenSpreadCode,
  classMayBeEmpty,
  codesIn,
  elementsIn,
  filtersRest,
  identifierCounts,
  identifiersIn,
  isArrayType,
  isBlank,
  itemBinding,
  onlyClass,
  PRESERVED_TAGS,
  propKey,
  scriptCodes,
  slotsUsedIn,
  unionMembers,
  unsupported,
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
  const codes = allCodes(component)
  const used = new Set([
    ...codes.flatMap((code) => [...identifiersIn(code)]),
    ...variableTags,
  ])
  const usedInScript = new Set(
    scriptCodes(component).flatMap((code) => [...identifiersIn(code)]),
  )
  const attrsOnInner = !restOnRoot
  const { chosenRest, multiRoot } = component
  const allAttrs = multiRoot || chosenRest
  const computedAttrs = attrsOnInner && !allAttrs
  const attributeProps = props.filter(
    ({ local, prop }) => prop.includes("-") && used.has(local),
  )
  const restUsed =
    (!!rest &&
      codes.some((code) => code !== rest && identifiersIn(code).has(rest))) ||
    attributeProps.length > 0
  if (attrsOnInner && codes.some((code) => /\bmergeStyle\(/.test(code))) {
    throw unsupported(
      "BC502",
      component.file,
      `mergeStyle with ${rest} on an inner element`,
    )
  }
  const classProp = props.find(({ prop }) => prop === "class")
  const classInScript = classProp && usedInScript.has(classProp.local)
  const modelRename = MODEL_KINDS[component.model?.kind]?.vue?.rename?.(
    component.model,
  )
  const slotReaders = derived.reduce((names, { code, name }) => {
    const ids = identifiersIn(code)
    return slotsUsedIn(code).length > 0 ||
      trimmedSlots.some(({ local }) => ids.has(local)) ||
      [...names].some((other) => ids.has(other))
      ? new Set([...names, name])
      : names
  }, new Set())
  const getters = new Set(
    derived
      .filter(({ fn, name }) => !fn && slotReaders.has(name))
      .map(({ name }) => name),
  )
  const providedReader = provide?.value.find(
    ({ code }) =>
      slotsUsedIn(code).length > 0 ||
      [...identifiersIn(code)].some((name) => slotReaders.has(name)),
  )
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
        ? [[local, "$props.class"]]
        : prop === "style"
          ? [[local, "$attrs.style"]]
          : prop.includes("-")
            ? [[local, `attrs['${prop}']`]]
            : [],
    ),
    ...(restUsed ? [[rest, "attrs"]] : []),
    ...trimmedSlots.map(({ local, slot }) => [local, `$slots${vueSlot(slot)}`]),
    ...[...getters].map((name) => [name, `${name}()`]),
    ...(modelRename?.template ?? []),
  ])
  const computedConsts = derived.filter(
    ({ fn, name }) => !fn && !getters.has(name),
  )
  const derivedNames = new Set(computedConsts.map(({ name }) => name))
  const scriptRename = new Map([
    ...rename,
    ...(classInScript ? [[classProp.local, classProp.local]] : []),
    ...(computedAttrs && restUsed ? [[rest, "attrs.value"]] : []),
    ...(computedAttrs
      ? attributeProps.map(({ local, prop }) => [
          local,
          `attrs.value['${prop}']`,
        ])
      : []),
    ...computedConsts.map(({ name }) => [name, `${name}.value`]),
    ...trimmedSlots.map(({ local, slot }) => [local, `slots${vueSlot(slot)}`]),
    ...(modelRename?.script ?? []),
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
  if (component.model?.refusal) throw component.model.refusal
  const { model } = component
  const kind = MODEL_KINDS[model?.kind]?.vue
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
  const explicitAttrs = kind?.explicitAttrs === true
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
  const inheritsAttrs = !(
    attrsOnInner ||
    explicitAttrs ||
    filteredAttrs ||
    definedRoot
  )
  const generic = kind?.generic?.(model) === true
  const modelRead = !!model?.local && used.has(model.local)
  const { item } = component
  const forwarded = (component.baseProps ?? [])
    .filter(
      (key) =>
        key !== "class" &&
        key !== "style" &&
        key !== model?.prop &&
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
    ...(classInScript
      ? [{ prop: "class", text: `class: ${classProp.local}` }]
      : []),
    ...forwarded.map((key) => ({ prop: key, text: key })),
    ...(kind?.declared?.(model) ?? []).map((prop) => ({ prop, text: prop })),
    ...props
      .filter(
        ({ local, prop }) =>
          prop !== "class" &&
          prop !== "style" &&
          !prop.includes("-") &&
          !kind?.undeclared?.(model, prop) &&
          (used.has(local) ||
            prop === model?.prop ||
            (generic && prop === "multiple")),
      )
      .map(({ default: fallback, local, prop }) => ({
        prop,
        text: `${local === prop ? prop : `${propKey(prop)}: ${local}`}${
          fallback
            ? ` = ${fallback}`
            : (item && local === item.checked) || castsToFalse(prop)
              ? " = undefined"
              : ""
        }`,
      })),
  ]
    .toSorted((a, b) => byName(a.prop, b.prop))
    .map(({ text }) => text)
  const slotsInScript = scriptCodes(component).some(
    (code) =>
      slotsUsedIn(code).length > 0 ||
      trimmedSlots.some(({ local }) => identifiersIn(code).has(local)),
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
      return `:class="${rewriteExpression(onlyClass(item.code) ?? item.code, scope)}"`
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
    if (
      rest &&
      rootElements.includes(node) &&
      inheritsAttrs &&
      identifiersIn(item.code).has(rest)
    ) {
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
      const declared = new Set([
        ...(scope.declared ?? []),
        ...identifiersIn(node.item),
        ...(node.index ? [node.index] : []),
        ...node.consts.map(({ name }) => name),
      ])
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
      const loop = `v-for="${node.index ? `(${item}, ${node.index})` : item} in ${list}" :key="${node.key?.code ?? node.index}"`
      return root.type === "element"
        ? emitOne(root, loop, inner)
        : `<template ${loop}>${emitOne(root, undefined, inner)}</template>`
    }
    const itemChecked = node.item
      ? node.attributes.find(
          (item) => item.kind === "expression" && item.name === "checked",
        )
      : undefined
    const ownAttributes = node.attributes.filter((item) => item !== itemChecked)
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
    const checkedRename = node.item
      ? kind?.checkedRename?.(component.item)
      : undefined
    const bindScope = checkedRename
      ? { ...scope, rename: new Map([...scope.rename, checkedRename]) }
      : scope
    const pair =
      node.model && kind?.boundAttributes
        ? {
            bound: kind.boundAttributes(model),
            condition: "bound",
            drop: () => false,
            own: kind.unboundOwn?.(model),
            unbound: [],
          }
        : node.groupRadio !== undefined && kind?.boundAttributes
          ? {
              bound: kind.boundAttributes(model),
              condition: "bound",
              drop: (entry) => entry.name === "checked",
              own: {
                code: rewriteExpression(
                  node.attributes.find(
                    (entry) =>
                      entry.kind === "expression" && entry.name === "checked",
                  ).code,
                  scope,
                ),
                name: "checked",
              },
              unbound: [],
            }
          : itemChecked
            ? {
                bound: ['v-model="target"'],
                condition: kind?.ownModel
                  ? `${component.item.parent}?.bound || bound`
                  : `${component.item.parent}?.bound`,
                drop: () => false,
                own: {
                  code: rewriteExpression(itemChecked.code, bindScope),
                  name: "checked",
                },
                unbound: [],
              }
            : undefined
    const withOwn = (listed, entry) => {
      if (entry === undefined || entry.child) return listed
      if (entry.attr) return [...listed, `:${entry.name}.attr="${entry.code}"`]
      usesDefined = true
      const own = `defined({ ${entry.name === entry.code ? entry.name : `${entry.name}: ${entry.code}`} })`
      const at = listed.findIndex((entry) => OBJECT_BINDING.test(entry))
      if (at === -1) return [...listed, `v-bind="${own}"`]
      const spread = OBJECT_BINDING.exec(listed[at])[1]
      return listed.map((entry, index) =>
        index === at ? `v-bind="{ ...${own}, ...${spread} }"` : entry,
      )
    }
    const listedFor = (first, extra, drop, own) =>
      withOwn(
        [
          ...(first ? [first] : []),
          ...bound
            .filter((entry) => !drop(entry))
            .map((entry) =>
              entry.kind === "bound"
                ? entry.text
                : attribute(node, entry, bindScope),
            )
            .filter(Boolean),
          ...extra,
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
          !node.attributes.some((entry) => entry.kind === "class")
            ? [':class="$props.class"']
            : []),
        ].flatMap((entry) => entry.match(ATTRIBUTE) ?? []),
        own,
      )
    const render = (listed, child) => {
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
      if (child !== undefined) return `${open}>{{ ${child} }}</${tag}>`
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
    if (!pair) return render(listedFor(clause, [], () => false))
    const both = `${render(
      listedFor(`v-if="${pair.condition}"`, pair.bound, pair.drop),
    )}\n${render(
      listedFor(
        "v-else",
        pair.unbound,
        (entry) => pair.own?.name === "checked" && entry.name === "checked",
        pair.own,
      ),
      pair.own?.child ? pair.own.code : undefined,
    )}`
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
    const codes = [
      ...node.consts.map(({ code }) => code),
      ...codesIn(node.children),
      ...elementsIn(node.children).flatMap((element) =>
        element.variable ? [element.tag] : [],
      ),
    ]
    const reads = (name) =>
      codes.reduce(
        (total, code) => total + (identifierCounts(code).get(name) ?? 0),
        0,
      )
    if (!node.consts.some(({ name }) => reads(name) > 1)) return undefined
    const inTemplate = [node.list, ...node.consts.map(({ code }) => code)].some(
      (code) => {
        const ids = identifiersIn(code)
        return (
          slotsUsedIn(code).length > 0 ||
          trimmedSlots.some(({ local }) => ids.has(local)) ||
          [...ids].some(
            (name) => slotReaders.has(name) || scope.declared?.has(name),
          )
        )
      },
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
    const constCodes = node.consts.map(({ code }) => code)
    const readInConsts = (local) =>
      constCodes.some((code) => identifiersIn(code).has(local))
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
    const usesIndex = constCodes.some((code) =>
      identifiersIn(code).has(node.index),
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
    ? [
        ...(kind?.providedFirst?.() ?? []),
        ...provide.value.map(
          ({ code, key }) =>
            kind?.providedEntry?.(model, key) ??
            (derivedNames.has(code)
              ? code === key
                ? key
                : `${key}: ${code}`
              : `${key}: computed(() => ${rewriteExpression(code, script)})`),
        ),
      ]
    : undefined
  const vueProps = generic ? "Props & { multiple?: Multiple }" : "Props"
  const modelType = generic
    ? `type Model = Multiple extends true ? ${unionMembers(model.type)
        .filter(isArrayType)
        .join(" | ")} : ${unionMembers(model.type)
        .filter((member) => !isArrayType(member))
        .join(" | ")}`
    : undefined
  const propsLine = `${modelType ? `${modelType}\n\n` : ""}${
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
  const statements = [
    ...(filteredAttrs
      ? [
          `const restAttrs = computed(() => {\n  const { ${attributeProps.map(({ local, prop }) => `${JSON.stringify(prop)}: _${local}, `).join("")}...rest } = attrs\n  return rest\n})`,
        ]
      : []),
    ...(kind?.setup?.(model, generic, modelRead) ?? []),
    ...reads.map(
      ({ context, name }) =>
        `const ${name} = inject(${context.name}Key, undefined)`,
    ),
    ...(uid ? ["const uid = useId()"] : []),
    ...declarations.map(({ line }) => line),
    ...rowLists,
    ...warnings.map((code) => rewriteStatement(code, script)),
    ...(item
      ? [
          `watchEffect(() =>\n  ${groupWarning(component, item, kind?.warningChecked?.(item) ?? item.checked ?? "undefined", `${item.grouped}.value`)},\n)`,
          kind?.ownModel
            ? `const target = computed({\n  get: () => (${item.parent}?.bound ? ${item.parent}.value : model.value),\n  set: (next) => {\n    if (${item.parent}?.bound) ${item.parent}.value = next as typeof ${item.parent}.value\n    else model.value = next as typeof model.value\n  },\n})`
            : `const target = computed({\n  get: () => ${item.parent}?.value,\n  set: (next) => {\n    if (${item.parent}) ${item.parent}.value = next\n  },\n})`,
        ]
      : []),
    ...(provide
      ? [
          `provide(${provide.context.name}Key, reactive({ ${provided.join(", ")} }))`,
        ]
      : []),
  ]
  const vueHelpers = [
    ...(computedAttrs ? ["useInputAttrs"] : []),
    ...namesFrom(
      helpersCalled(
        withoutUnused(statements, markup, declarations).join("\n"),
        modelHelpers("vue", component),
      ),
      "../vue",
    ),
    ...(hydrating.size ? ["vHydrated"] : []),
  ].toSorted(byName)
  const plainAttrs =
    !computedAttrs && (allAttrs || explicitAttrs || restUsed || definedRoot)
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
      ? ["type IntrinsicElementAttributes", "useAttrs"]
      : typedAttrs
        ? ["type HTMLAttributes", "useAttrs"]
        : plainAttrs
          ? ["useAttrs"]
          : []),
    ...(attributeHelpers.has("mergeProps") ? ["mergeProps"] : []),
    ...(item ? ["watchEffect"] : []),
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
      ...(item ? [["../dev", "warnGroupedChecked"]] : []),
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
            `const attrs = useAttrs() as IntrinsicElementAttributes[${JSON.stringify(model.element.tag)}]`,
          ]
        : typedAttrs
          ? ["const attrs = useAttrs() as HTMLAttributes"]
          : plainAttrs
            ? ["const attrs = useAttrs()"]
            : []),
    ...statements,
  ]
  const kept = withoutUnused(setup, markup, declarations)
  return `<script setup lang="ts"${generic ? ' generic="Multiple extends boolean = false"' : ""}>\n${kept.join("\n\n")}\n</script>\n\n<template>\n${indent(markup, 2)}\n</template>\n`
}
