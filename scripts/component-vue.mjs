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
  groupWarning,
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
import { MODEL_KINDS } from "./component-models.mjs"
import {
  allCodes,
  byName,
  chosenSpreadCode,
  classMayBeEmpty,
  filtersRest,
  identifiersIn,
  isArrayType,
  isBlank,
  PRESERVED_TAGS,
  propKey,
  scriptCodes,
  slotsUsedIn,
  unionMembers,
  unsupported,
} from "./component-shared.mjs"

const vueSlot = (name) => (name.includes("-") ? `['${name}']` : `.${name}`)

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

const omitEmptyAttributes = (attributes) => {
  const omitted = emptyBindings(attributes)
  if (omitted.length === 0) return { attributes, helpers: [] }
  const bound = attributes.filter((entry) => OBJECT_BINDING.test(entry))
  if (bound.length > 1) {
    throw new Error(
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
      code: /^\{[\s\S]*\}$/.test(spread) ? spread : `{ ...${spread} }`,
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
          item.condition === undefined && filtersRest(node, item, component),
      ),
    )
  const inheritsAttrs = !(
    attrsOnInner ||
    explicitAttrs ||
    filteredAttrs ||
    definedRoot
  )
  const generic = kind?.generic?.(model) === true
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
    if (!filtersRest(node, item, component)) return code
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
      return `:class="${rewriteExpression(item.code, scope)}"`
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
      return `${item.name}=${JSON.stringify(item.value)}`
    }
    if (item.kind === "boolean") return item.name
    if (
      rest &&
      rootElements.includes(node) &&
      inheritsAttrs &&
      identifiersIn(item.code).has(rest)
    ) {
      throw unsupported(
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
      const inner = {
        ...scope,
        rename: new Map([
          ...scope.rename,
          ...node.consts.map(({ code, name }) => [
            name,
            rewriteExpression(code, scope),
          ]),
        ]),
      }
      const root = node.children.find((child) => !isBlank(child))
      const loop = `v-for="(${node.item}, ${node.index}) in ${rewriteExpression(node.list, scope)}" :key="${node.index}"`
      return root.type === "element"
        ? emitOne(root, loop, inner)
        : `<template ${loop}>${emitOne(root, undefined, inner)}</template>`
    }
    const spreads = node.attributes.filter(
      (item) =>
        item.kind === "spread" &&
        !(
          item.code === rest &&
          item.condition === undefined &&
          rootElements.includes(node) &&
          !definedRoot
        ),
    )
    const first = node.attributes.indexOf(spreads[0])
    const last = node.attributes.indexOf(spreads.at(-1))
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
        component.file,
        `a class list between two spreads on <${node.tag}>`,
      )
    }
    const bound =
      spreads.length > 1
        ? [
            ...node.attributes.slice(0, first),
            {
              kind: "bound",
              text: `v-bind="${objectCode(
                node.attributes.slice(first, last + 1).map(merged),
                { quote: "'", shorthand: false },
              )}"`,
            },
            ...node.attributes.slice(last + 1),
          ]
        : node.attributes
    const checkedRename = node.item
      ? kind?.checkedRename?.(component.item)
      : undefined
    const bindScope = checkedRename
      ? { ...scope, rename: new Map([...scope.rename, checkedRename]) }
      : scope
    const listed = [
      ...(clause ? [clause] : []),
      ...bound
        .filter(
          (item) =>
            !(
              node.groupRadio !== undefined &&
              kind?.modelsGroupRadio &&
              item.name === "checked"
            ),
        )
        .map((item) =>
          item.kind === "bound" ? item.text : attribute(node, item, bindScope),
        )
        .filter(Boolean),
      ...(node.model ? kind.attributes(model) : []),
      ...(node.item ? ['@change="change"'] : []),
      ...(node.groupRadio !== undefined
        ? kind.radioAttributes(model, rewriteExpression(node.groupRadio, scope))
        : []),
      ...((rootElements.includes(node) ||
        (multiRoot &&
          node.attributes.some(
            (entry) => entry.kind === "spread" && entry.code === rest,
          ))) &&
      !node.attributes.some((entry) => entry.kind === "class")
        ? [':class="$props.class"']
        : []),
    ].flatMap((entry) => entry.match(ATTRIBUTE) ?? [])
    const omitted = omitEmptyAttributes(listed)
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
  const vueImports = [
    ...(computedConsts.length ||
    filteredAttrs ||
    kind?.computed === true ||
    provided?.some((entry) => entry.includes("computed("))
      ? ["computed"]
      : []),
    ...(reads.length ? ["inject"] : []),
    ...(provide ? ["provide", "reactive"] : []),
    ...(explicitAttrs
      ? ["type IntrinsicElementAttributes", "useAttrs"]
      : allAttrs || definedRoot || (restUsed && !attrsOnInner)
        ? ["type HTMLAttributes", "useAttrs"]
        : []),
    ...(attributeHelpers.has("mergeProps") ? ["mergeProps"] : []),
    ...(item ? ["watchEffect"] : []),
    ...(uid ? ["useId"] : []),
  ].toSorted((a, b) => byName(a.replace(/^type /, ""), b.replace(/^type /, "")))
  const vueHelpers = [
    ...(computedAttrs ? ["useInputAttrs"] : []),
    ...(kind?.vueHelpers?.(model) ?? []),
  ].toSorted(byName)
  const importLines = [
    ...scriptImports(component),
    ...(vueImports.length
      ? [`import { ${vueImports.join(", ")} } from "vue"`]
      : []),
    ...(vueHelpers.length
      ? [`import { ${vueHelpers.join(", ")} } from "../vue"`]
      : []),
    ...(kind?.imports?.(component, model) ?? []),
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
    propsImport(propsType, "types.vue-props", slots.length ? [slotsType] : []),
  ]
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
  const setup = [
    importLines.join("\n"),
    slots.length ? `${propsLine}\n${slotsLine}` : propsLine,
    ...(inheritsAttrs ? [] : ["defineOptions({\n  inheritAttrs: false,\n})"]),
    ...(computedAttrs
      ? ["const attrs = useInputAttrs()"]
      : allAttrs
        ? ["const attrs = useAttrs() as HTMLAttributes"]
        : explicitAttrs
          ? [
              `const attrs = useAttrs() as IntrinsicElementAttributes[${JSON.stringify(model.element.tag)}]`,
            ]
          : restUsed || definedRoot
            ? ["const attrs = useAttrs() as HTMLAttributes"]
            : []),
    ...(filteredAttrs
      ? [
          `const restAttrs = computed(() =>\n  Object.fromEntries(\n    Object.entries(attrs).filter(\n      ([key]) => ${attributeProps.map(({ prop }) => `key !== ${JSON.stringify(prop)}`).join(" && ")},\n    ),\n  ),\n)`,
        ]
      : []),
    ...(kind?.setup?.(model, generic) ?? []),
    ...reads.map(
      ({ context, name }) =>
        `const ${name} = inject(${context.name}Key, undefined)`,
    ),
    ...(uid ? ["const uid = useId()"] : []),
    ...declarations.map(({ line }) => line),
    ...warnings.map((code) => rewriteStatement(code, script)),
    ...(item
      ? [
          `watchEffect(() =>\n  ${groupWarning(component, item, kind?.warningChecked?.(item) ?? item.checked ?? "undefined", `${item.grouped}.value`)},\n)`,
          kind?.change?.(item) ??
            `const change = (event: Event) =>\n  ${item.parent}?.change?.(event.currentTarget as HTMLInputElement)`,
        ]
      : []),
    ...(provide
      ? [
          `provide(${provide.context.name}Key, reactive({ ${provided.join(", ")} }))`,
        ]
      : []),
  ]
  const kept = withoutUnused(setup, markup, declarations)
  return `<script setup lang="ts"${generic ? ' generic="Multiple extends boolean = false"' : ""}>\n${kept.join("\n\n")}\n</script>\n\n<template>\n${indent(markup, 2)}\n</template>\n`
}
