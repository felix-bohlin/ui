import { VOID_ELEMENTS } from "./html-tokens.mjs"
import { slotProp } from "../src/component-api/frameworks.ts"
import {
  componentImport,
  contextImports,
  edgeTrimmed,
  groupWarning,
  importedNames,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  scriptImports,
  slotOrder,
  truthyNames,
  withImport,
} from "./component-emit.mjs"
import { MODEL_KINDS } from "./component-models.mjs"
import {
  byName,
  chosenSpreadCode,
  classMayBeEmpty,
  filtersSpread,
  PRESERVED_TAGS,
  propKey,
  unsupported,
} from "./component-shared.mjs"

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
  if (component.model?.refusal) throw component.model.refusal
  const { model } = component
  const kind = MODEL_KINDS[model?.kind]?.svelte
  const options = {
    rename: new Map([
      ...trimmedSlots.map(({ local, slot }) => [local, slotProp(slot)]),
      ...(kind?.rename?.(model, component) ?? []),
    ]),
    ids: component.ids,
    slotHas: (name) => slotProp(name),
  }
  const props = component.props.filter(
    ({ local }) => !stringSlots.includes(local),
  )
  const reserved = derived.find(({ name }) => name.startsWith("$"))
  if (reserved) {
    throw unsupported(
      component.file,
      `the const \`${reserved.name}\`, whose \`$\` prefix Svelte reserves`,
      "rename the const in the Astro file",
    )
  }
  const bindableProps = kind ? kind.bindables(model) : []
  const plainProps = [
    ...(kind?.plainProps?.(model) ?? []),
    ...(component.item ? ["defaultChecked", "onchange"] : []),
  ]
  const added = [...bindableProps, ...plainProps]
    .filter((prop) => !props.some((entry) => entry.prop === prop))
    .map((prop) => ({ local: prop, prop }))
  const taken = new Set([
    ...derived.map(({ name }) => name),
    ...importedNames(imports),
  ])
  const clash = added.find(({ local }) => taken.has(local))
  if (clash) {
    throw unsupported(
      component.file,
      `the name \`${clash.local}\`, which the Svelte port also declares as a prop`,
      "rename the import or const in the Astro file",
    )
  }
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
  let usesClassAttrs = false
  let usesDefined = false
  const attribute = (node, item) => {
    if (item.kind === "class") {
      const code = rewriteExpression(item.code, options)
      if (!classMayBeEmpty(item.code)) return `class={${code}}`
      usesClassAttrs = true
      return `{...classAttrs(${code})}`
    }
    if (item.kind === "spread") {
      const cast =
        item.code === rest &&
        !node.variable &&
        !node.component &&
        !node.custom &&
        element &&
        node.tag !== element
      if (cast) usesElements = true
      const filtered = filtersSpread(node, item, component)
      if (filtered) usesDefined = true
      const code = filtered
        ? `defined(${item.code === rest ? rest : rewriteExpression(item.code, options)})`
        : rest
      const spread = cast
        ? `${code} as SvelteHTMLElements[${JSON.stringify(node.tag)}]`
        : filtered
          ? code
          : rewriteExpression(item.code, options)
      if (item.condition !== undefined) {
        const plain = !node.variable && !node.component && !node.custom
        if (plain) usesElements = true
        const chosen = chosenSpreadCode(
          item,
          plain
            ? `(${rest} as SvelteHTMLElements[${JSON.stringify(node.tag)}])`
            : `(${rest} as object)`,
          rewriteExpression(item.condition, options),
        )
        return filtered ? `{...defined(${chosen})}` : `{...(${chosen})}`
      }
      return `{...${spread}}`
    }
    if (item.kind === "static") {
      return `${item.name}=${JSON.stringify(item.value)}`
    }
    if (item.kind === "boolean") return item.name
    const keepsDefault =
      item.name === "checked" &&
      node.tag === "input" &&
      node.attributes.some(
        (entry) => entry.kind === "spread" && entry.code === rest,
      )
    const code = keepsDefault
      ? `(${item.code}) ?? ${node.item ? "defaultChecked" : `${rest}.defaultChecked`}`
      : item.code
    const emitted = `${item.name}={${rewriteExpression(code, options)}}`
    return node.item && item.name === "checked"
      ? `${emitted} defaultChecked={${component.item.grouped} === undefined ? defaultChecked : undefined}`
      : emitted
  }
  const body = (nodes, scope, head = "") => {
    const inner = scope.preserved ? undefined : edgeTrimmed(nodes)
    return inner
      ? `\n${head && `${head}\n`}${emit(inner, scope)}\n`
      : `${head}${emit(nodes, scope)}`
  }
  const guarded = (scope, test) => ({
    ...scope,
    guards: new Set([...scope.guards, ...truthyNames(test)]),
  })
  const emit = (nodes, scope) =>
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
          if (node.fallback.length === 0) {
            return scope.guards.has(name)
              ? `{@render ${name}()}`
              : `{@render ${name}?.()}`
          }
          return `{#if ${name}}\n{@render ${name}()}\n{:else}${body(node.fallback, scope)}{/if}`
        }
        if (node.type === "if") {
          const test = rewriteExpression(node.test, options)
          const consequent = body(node.consequent, guarded(scope, test))
          if (!node.alternate) return `{#if ${test}}${consequent}{/if}`
          return `{#if ${test}}${consequent}{:else}${body(node.alternate, scope)}{/if}`
        }
        if (node.type === "each") {
          const consts = node.consts
            .map(
              ({ code, name }) =>
                `{@const ${name} = ${rewriteExpression(code, options)}}`,
            )
            .join("\n")
          return `{#each ${node.list}${node.optional ? " ?? []" : ""} as ${node.item}, ${node.index} (${node.index})}${body(node.children, scope, consts)}{/each}`
        }
        const groupChecked =
          node.groupRadio !== undefined && kind?.modelsGroupRadio
            ? node.attributes.find((item) => item.name === "checked")
            : undefined
        const attributes = [
          ...node.attributes
            .filter((item) => item !== groupChecked)
            .map((item) => attribute(node, item)),
          ...(node.model ? modelAttributes : []),
          ...(node.groupRadio !== undefined
            ? kind.radioAttributes(
                model,
                rewriteExpression(node.groupRadio, options),
                groupChecked && rewriteExpression(groupChecked.code, options),
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
        return `${open}>${body(node.children, {
          ...scope,
          preserved: scope.preserved || PRESERVED_TAGS.has(node.tag),
        })}</${tag}>`
      })
      .join("")
  const markup = emit(tree, { guards: new Set(), preserved: false })
  const importLines = [
    ...scriptImports(component),
    ...(warnings.length || component.item || kind?.untrack?.(model)
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
    ...[
      ...(usesDefined ? [["../attrs", "defined"]] : []),
      ...(component.item ? [["../dev", "warnGroupedChecked"]] : []),
      ...(usesClassAttrs ? [["../cx", "classAttrs"]] : []),
    ].reduce(
      (lines, [module, name]) => withImport(lines, module, name),
      imports,
    ),
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
          `untrack(() => ${groupWarning(component, component.item, `${component.item.checked ?? "undefined"} ?? defaultChecked`)})`,
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
