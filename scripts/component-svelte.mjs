import { VOID_ELEMENTS } from "./html-tokens.mjs"
import { slotProp } from "../src/component-api/frameworks.ts"
import {
  componentImport,
  contextImports,
  groupWarning,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  scriptImports,
  slotOrder,
  withImport,
} from "./component-emit.mjs"
import { MODEL_KINDS } from "./component-models.mjs"
import { byName, propKey, unsupported } from "./component-shared.mjs"

export const toSvelte = (component) => {
  const {
    components,
    derived,
    element,
    imports,
    propsType,
    provide,
    reads,
    rest,
    slots,
    stringSlots,
    tree,
    trimmedSlots,
    uid,
    warnings,
  } = component
  const options = {
    rename: new Map(
      trimmedSlots.map(({ local, slot }) => [local, slotProp(slot)]),
    ),
    slotHas: (name) => slotProp(name),
  }
  const props = component.props.filter(
    ({ local }) => !stringSlots.includes(local),
  )
  if (component.model?.refusal) throw component.model.refusal
  const reserved = derived.find(({ name }) => name.startsWith("$"))
  if (reserved) {
    throw unsupported(
      component.file,
      `the const \`${reserved.name}\`, whose \`$\` prefix Svelte reserves`,
      "rename the const in the Astro file",
    )
  }
  const { model } = component
  const kind = MODEL_KINDS[model?.kind]?.svelte
  const bindableProps = kind ? kind.bindables(model) : []
  const plainProps = [
    ...(kind?.plainProps?.(model) ?? []),
    ...(component.item ? ["onchange"] : []),
  ]
  const added = [...bindableProps, ...plainProps]
    .filter((prop) => !props.some((entry) => entry.prop === prop))
    .map((prop) => ({ local: prop, prop }))
  const entries = [...props, ...added]
    .toSorted((a, b) => byName(a.prop, b.prop))
    .map(({ default: fallback, local, prop }) =>
      bindableProps.includes(prop)
        ? `${prop} = $bindable(${fallback ?? ""})`
        : `${prop === local ? prop : `${propKey(prop)}: ${local}`}${fallback ? ` = ${fallback}` : ""}`,
    )
  const modelAttributes = kind?.attributes?.(model) ?? []
  const slotEntries = slotOrder(slots).map((slot) => slotProp(slot))
  let usesElements = false
  let usesContent = false
  const attribute = (node, item) => {
    if (item.kind === "class") {
      return `class={${rewriteExpression(item.code, options)}}`
    }
    if (item.kind === "spread") {
      if (
        item.code === rest &&
        !node.variable &&
        !node.component &&
        !node.custom &&
        element &&
        node.tag !== element
      ) {
        usesElements = true
        return `{...${rest} as SvelteHTMLElements[${JSON.stringify(node.tag)}]}`
      }
      return `{...${rewriteExpression(item.code, options)}}`
    }
    if (item.kind === "static") {
      return `${item.name}=${JSON.stringify(item.value)}`
    }
    if (item.kind === "boolean") return item.name
    return `${item.name}={${rewriteExpression(item.code, options)}}`
  }
  const emit = (nodes) =>
    nodes
      .map((node) => {
        if (node.type === "text") {
          return node.value === " " ? '{" "}' : node.value
        }
        if (node.type === "expression") {
          const code = node.code.trim()
          if (stringSlots.includes(code)) {
            return nodes.some(
              (sibling) =>
                sibling.type === "slot" && slotProp(sibling.name) === code,
            )
              ? ""
              : ((usesContent = true), `{@render content(${code})}`)
          }
          return `{${rewriteExpression(node.code, options)}}`
        }
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (
            stringSlots.includes(name) ||
            component.stringTypedSlots.includes(name)
          ) {
            usesContent = true
            return `{@render content(${name})}`
          }
          if (node.fallback.length === 0) return `{@render ${name}?.()}`
          return `{#if ${name}}{@render ${name}()}{:else}${emit(node.fallback)}{/if}`
        }
        if (node.type === "if") {
          const test = rewriteExpression(node.test, options)
          const consequent = emit(node.consequent)
          if (!node.alternate) return `{#if ${test}}${consequent}{/if}`
          return `{#if ${test}}${consequent}{:else}${emit(node.alternate)}{/if}`
        }
        if (node.type === "each") {
          const consts = node.consts
            .map(
              ({ code, name }) =>
                `{@const ${name} = ${rewriteExpression(code, options)}}`,
            )
            .join("")
          return `{#each ${node.list}${node.optional ? " ?? []" : ""} as ${node.item}, ${node.index} (${node.index})}${consts}${emit(node.children)}{/each}`
        }
        const attributes = [
          ...node.attributes.map((item) => attribute(node, item)),
          ...(node.model ? modelAttributes : []),
          ...(node.groupRadio !== undefined
            ? kind.radioAttributes(
                model,
                rewriteExpression(node.groupRadio, options),
              )
            : []),
          ...(node.item
            ? [
                `onchange={(event) => {\n${(kind?.onchange?.(model, component.item) ?? []).map((line) => `  ${line}\n`).join("")}  ${component.item.parent}?.change?.(event.currentTarget)\n  onchange?.(event)\n}}`,
              ]
            : []),
        ].join(" ")
        const tag = node.variable ? "svelte:element" : node.tag
        const open = `<${tag}${node.variable ? ` this={${node.tag}}` : ""}${attributes ? ` ${attributes}` : ""}`
        if (
          node.children.length === 0 &&
          (node.component ||
            node.variable ||
            node.foreign ||
            VOID_ELEMENTS.has(node.tag))
        ) {
          return `${open} />`
        }
        return `${open}>${emit(node.children)}</${tag}>`
      })
      .join("")
  const markup = emit(tree)
  const importLines = [
    ...scriptImports(component),
    ...(warnings.length || component.item
      ? [`import { untrack } from "svelte"`]
      : []),
    ...(usesContent ? [`import { content } from "../content.svelte"`] : []),
    ...(kind?.imports?.(component, model) ?? []),
    ...components
      .map((entry) => componentImport(entry, ".svelte"))
      .toSorted(byName),
    ...contextImports(component, "svelte", {
      provide: (name) => `set${name}Context`,
      read: (name) => `get${name}Context`,
    }),
    ...(component.item
      ? withImport(imports, "../dev", "warnGroupedChecked")
      : imports),
    propsImport(propsType, "types.svelte"),
    ...(usesElements
      ? [`import type { SvelteHTMLElements } from "svelte/elements"`]
      : []),
  ]
  const destructured = [
    ...entries,
    ...(slotEntries.length ? ["", "// Snippets", ...slotEntries] : []),
    ...(rest ? [`...${rest}`] : []),
  ]
  const lines = destructured.map((line) =>
    line === ""
      ? ""
      : line.startsWith("//") || line.startsWith("...")
        ? `    ${line}`
        : `    ${line},`,
  )
  const script = [
    ...reads.map(
      ({ context, name }) => `const ${name} = get${context.name}Context()`,
    ),
    ...(uid ? ["const uid = $props.id()"] : []),
    ...(kind?.script?.(model) ?? []),
    ...derived.map(({ code, fn, name }) =>
      fn
        ? `const ${name} = ${rewriteExpression(code, options)}`
        : `const ${name} = $derived(${rewriteExpression(code, options)})`,
    ),
    ...warnings.map((code) =>
      /^if\b/.test(code)
        ? `untrack(() => {\n${rewriteStatement(code, options)}\n})`
        : `untrack(() => ${rewriteExpression(code, options)})`,
    ),
    ...(component.item
      ? [
          `untrack(() => ${groupWarning(component, component.item, component.item.checked ?? "undefined")})`,
        ]
      : []),
    ...(provide
      ? [
          `set${provide.context.name}Context({\n${[
            ...(kind?.context?.(model) ?? []),
            ...provide.value.map(
              ({ code, key }) =>
                `get ${key}() {\nreturn ${rewriteExpression(code, options)}\n},`,
            ),
          ].join("\n")}\n})`,
        ]
      : []),
  ]
  return `<script lang="ts">\n${importLines.map((line) => `  ${line}`).join("\n")}\n\n  let {\n${lines.join("\n")}\n  }: Props = $props()\n${script.length ? `\n${script.map((line) => `  ${line}`).join("\n")}\n` : ""}</script>\n\n${markup}\n`
}
