import { VOID_ELEMENTS } from "./html-tokens.mjs"
import {
  componentImport,
  contextImports,
  groupWarning,
  indent,
  objectCode,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  scriptImports,
  styleOption,
  withImport,
} from "./component-emit.mjs"
import { kindOf, MODEL_KINDS } from "./component-models.mjs"
import {
  allCodes,
  byName,
  identifiersIn,
  isArrayType,
  isBlank,
  propKey,
  scriptCodes,
  slotsUsedIn,
  unionMembers,
  unsupported,
} from "./component-shared.mjs"

const vueSlot = (name) => (name.includes("-") ? `['${name}']` : `.${name}`)

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
  const { multiRoot } = component
  const computedAttrs = attrsOnInner && !multiRoot
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
  ])
  const computedConsts = derived.filter(({ fn }) => !fn)
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
  ])
  const template = {
    quote: "'",
    rename,
    slotHas: (name) => `$slots${vueSlot(name)}`,
    style: styleOption(component, "{}"),
  }
  const script = {
    rename: scriptRename,
    slotHas: (name) => `slots${vueSlot(name)}`,
    style: styleOption(component, "{}"),
  }
  if (component.model?.refusal) throw component.model.refusal
  const { model } = component
  const kind = MODEL_KINDS[kindOf(model)]?.vue
  const explicitAttrs = kind?.explicitAttrs === true
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
            : item && local === item.checked
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
  const attribute = (node, item, scope) => {
    if (item.kind === "class") {
      return `:class="${rewriteExpression(item.code, scope)}"`
    }
    if (item.kind === "spread") {
      if (item.code === rest) {
        const bound = forwarded.map((key) => `:${key}="${key}"`)
        return [
          ...(rootElements.includes(node) && !explicitAttrs
            ? []
            : [`v-bind="attrs"`]),
          ...bound,
        ].join(" ")
      }
      return `v-bind="${rewriteExpression(item.code, scope)}"`
    }
    if (item.kind === "static") {
      return `${item.name}=${JSON.stringify(item.value)}`
    }
    if (item.kind === "boolean") return item.name
    return `:${item.name}="${rewriteExpression(item.code, scope)}"`
  }
  const directive = (nodes, name, test, scope) => {
    const significant = nodes.filter((node) => !isBlank(node))
    const clause = test === undefined ? name : `${name}="${test}"`
    if (significant.length === 1 && significant[0].type !== "if") {
      return emitOne(significant[0], clause, scope)
    }
    return `<template ${clause}>${emit(nodes, scope)}</template>`
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
      const pair = `<slot v-if="$slots${vueSlot(node.name)}"${name}></slot>${directive(node.fallback, "v-else", undefined, scope)}`
      return clause ? `<template ${clause}>${pair}</template>` : pair
    }
    if (node.type === "if") {
      const test = rewriteExpression(node.test, scope)
      const consequent = directive(node.consequent, "v-if", test, scope)
      if (!node.alternate) return consequent
      return `${consequent}${directive(node.alternate, "v-else", undefined, scope)}`
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
      const loop = `v-for="(${node.item}, index) in ${rewriteExpression(node.list, scope)}" :key="index"`
      return root.type === "element"
        ? emitOne(root, loop, inner)
        : `<template ${loop}>${emitOne(root, undefined, inner)}</template>`
    }
    const spreads = node.attributes.filter(
      (item) =>
        item.kind === "spread" &&
        !(item.code === rest && rootElements.includes(node)),
    )
    const first = node.attributes.indexOf(spreads[0])
    const last = node.attributes.indexOf(spreads.at(-1))
    const merged = (item) => {
      if (item.kind === "spread") {
        return {
          spread:
            item.code === rest ? "attrs" : rewriteExpression(item.code, scope),
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
    const attributes = [
      ...(clause ? [clause] : []),
      ...bound
        .map((item) =>
          item.kind === "bound" ? item.text : attribute(node, item, bindScope),
        )
        .filter(Boolean),
      ...(node.model ? kind.attributes(model) : []),
      ...(node.item ? ['@change="change"'] : []),
      ...((rootElements.includes(node) ||
        (multiRoot &&
          node.attributes.some(
            (entry) => entry.kind === "spread" && entry.code === rest,
          ))) &&
      !node.attributes.some((entry) => entry.kind === "class")
        ? [':class="$props.class"']
        : []),
    ].join(" ")
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
    return `${open}>${emit(node.children, scope)}</${tag}>`
  }
  const emit = (nodes, scope) =>
    nodes.map((node) => emitOne(node, undefined, scope)).join("")
  const markup = emit(tree, template)
  const slotsType =
    propsType !== "Props" && slots.some((slot) => slot !== "default")
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
    kind?.computed === true ||
    provided?.some((entry) => entry.includes("computed("))
      ? ["computed"]
      : []),
    ...(reads.length ? ["inject"] : []),
    ...(provide ? ["provide", "reactive"] : []),
    ...(explicitAttrs
      ? ["type IntrinsicElementAttributes", "useAttrs"]
      : multiRoot || (restUsed && !attrsOnInner)
        ? ["type HTMLAttributes", "useAttrs"]
        : []),
    ...(item ? ["watchEffect"] : []),
    ...(uid ? ["useId"] : []),
  ].toSorted((a, b) => byName(a.replace(/^type /, ""), b.replace(/^type /, "")))
  const importLines = [
    ...scriptImports(component),
    ...(vueImports.length
      ? [`import { ${vueImports.join(", ")} } from "vue"`]
      : []),
    ...(computedAttrs ? [`import { useInputAttrs } from "../vue"`] : []),
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
    ...(item ? withImport(imports, "../dev", "warnGroupedChecked") : imports),
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
  const setup = [
    importLines.join("\n"),
    slots.length ? `${propsLine}\n${slotsLine}` : propsLine,
    ...(attrsOnInner || explicitAttrs
      ? ["defineOptions({\n  inheritAttrs: false,\n})"]
      : []),
    ...(computedAttrs
      ? ["const attrs = useInputAttrs()"]
      : multiRoot
        ? ["const attrs = useAttrs() as HTMLAttributes"]
        : explicitAttrs
          ? [
              `const attrs = useAttrs() as IntrinsicElementAttributes[${JSON.stringify(model.element.tag)}]`,
            ]
          : restUsed
            ? ["const attrs = useAttrs() as HTMLAttributes"]
            : []),
    ...(kind?.setup?.(model, generic) ?? []),
    ...reads.map(
      ({ context, name }) =>
        `const ${name} = inject(${context.name}Key, undefined)`,
    ),
    ...(uid ? ["const uid = useId()"] : []),
    ...derived.map(({ code, fn, name }) =>
      fn
        ? `const ${name} = ${rewriteExpression(code, script)}`
        : `const ${name} = computed(() => ${rewriteExpression(code, script)})`,
    ),
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
  return `<script setup lang="ts"${generic ? ' generic="Multiple extends boolean = false"' : ""}>\n${setup.join("\n\n")}\n</script>\n\n<template>\n${indent(markup, 2)}\n</template>\n`
}
