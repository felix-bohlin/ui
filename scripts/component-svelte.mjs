import { VOID_ELEMENTS } from "./html-tokens.mjs"
import { slotProp } from "../src/component-api/frameworks.ts"
import {
  componentImport,
  contextImports,
  edgeTrimmed,
  eventRoots,
  hydratingRoots,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  scriptImports,
  slotOrder,
  truthyNames,
  withImport,
} from "./component-emit.mjs"
import {
  bindingFor,
  helpersCalled,
  helpersOf,
  importLinesOf,
  isCheckedAttribute,
} from "./component-models.mjs"
import { markupAttribute } from "./example-encoders.mjs"
import { eventProp } from "./component-types.mjs"
import {
  byName,
  chosenSpreadCode,
  classMayBeEmpty,
  filtersSpread,
  onlyClass,
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
  const model = bindingFor(component, "svelte")
  const options = {
    rename: new Map(
      trimmedSlots.map(({ local, slot }) => [local, slotProp(slot)]),
    ),
    ids: component.ids,
    slotHas: (name) => slotProp(name),
  }
  const props = component.props.filter(
    ({ local }) => !stringSlots.some((entry) => entry.local === local),
  )
  const reserved = derived.find(({ name }) => name.startsWith("$"))
  if (reserved) {
    throw unsupported(
      "BC302",
      component.file,
      `the const \`${reserved.name}\`, whose \`$\` prefix Svelte reserves`,
      "rename the const in the Astro file",
    )
  }
  const rewrite = (code) => rewriteExpression(code, options)
  const bindableProps = model.props.bound.map(({ prop }) => prop)
  const listened = eventRoots(component)
  const handlers = (component.events ?? []).map((event) =>
    eventProp("svelte", event),
  )
  const hydrating = hydratingRoots(component, listened)
  const plainProps = [...model.props.added, ...handlers]
  const added = [...bindableProps, ...plainProps]
    .filter((prop) => !props.some((entry) => entry.prop === prop))
    .map((prop) => ({ local: prop, prop }))
  const clash = added.find(({ local }) => component.declared.has(local))
  if (clash) {
    throw unsupported(
      "BC301",
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
  const slotEntries = slotOrder(slots).map((slot) => slotProp(slot))
  let usesElements = false
  let usesContent = false
  let usesClassAttrs = false
  let usesDefined = false
  const attribute = (node, item) => {
    if (item.kind === "class") {
      const code = rewriteExpression(onlyClass(item.code) ?? item.code, options)
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
        ((element && node.tag !== element) || !!item.cast)
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
      return markupAttribute(item.name, item.value, true)
    }
    if (item.kind === "boolean") return item.name
    return `${item.name}={${rewriteExpression(item.code, options)}}`
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
          const string = stringSlots.find(
            ({ local }) => local === node.code.trim(),
          )
          if (string) {
            return nodes.some(
              (sibling) =>
                sibling.type === "slot" && sibling.name === string.slot,
            )
              ? ""
              : ((usesContent = true), `{@render content(${string.prop})}`)
          }
          return `{${rewriteExpression(node.code, options)}}`
        }
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (
            stringSlots.some(({ slot }) => slot === node.name) ||
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
          return `{#each ${node.list} as ${node.item}${node.index ? `, ${node.index}` : ""} (${node.index})}${body(node.children, scope, consts)}{/each}`
        }
        const modelAttributes = model.attributes(node, { rewrite })
        const spreadAt = node.attributes.findIndex(
          (item) => item.kind === "spread" && item.code === rest,
        )
        const restAt = listened.includes(node) ? spreadAt : -1
        const listeners = listened.includes(node)
          ? [
              ...handlers.map((handler) => `{${handler}}`),
              ...(hydrating.has(node)
                ? [
                    hydrating.get(node)
                      ? `data-hydrating={${rewriteExpression(hydrating.get(node), options)}.includes("-") ? "" : undefined}`
                      : 'data-hydrating=""',
                    "{@attach hydrated}",
                  ]
                : []),
            ]
          : []
        const attributes = [
          ...node.attributes.flatMap((item, index) => [
            ...(index === spreadAt ? modelAttributes.rest : []),
            ...(index === restAt ? listeners : []),
            ...(modelAttributes.checked && isCheckedAttribute(item)
              ? modelAttributes.checked
              : [attribute(node, item)]),
          ]),
          ...(spreadAt === -1 ? modelAttributes.rest : []),
          ...(restAt === -1 ? listeners : []),
          ...modelAttributes.end,
        ].join(" ")
        const tag = node.variable ? "svelte:element" : node.tag
        const open = `<${tag}${node.variable ? ` this={${node.tag}}` : ""}${attributes ? ` ${attributes}` : ""}`
        const progress =
          node.tag === "progress"
            ? node.attributes.find(
                (item) => item.kind === "expression" && item.name === "value",
              )
            : undefined
        const keyed = (element) =>
          progress
            ? `{#key ${rewriteExpression(progress.code, options)} == null}\n${element}\n{/key}`
            : element
        if (
          node.children.length === 0 &&
          (node.component ||
            node.variable ||
            node.foreign ||
            VOID_ELEMENTS.has(node.tag))
        ) {
          return keyed(`${open} />`)
        }
        return keyed(
          `${open}>${body(node.children, {
            ...scope,
            preserved: scope.preserved || PRESERVED_TAGS.has(node.tag),
          })}</${tag}>`,
        )
      })
      .join("")
  const markup = emit(tree, { guards: new Set(), preserved: false })
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
  const modelScript = model.script(rewrite)
  const script = [
    ...reads.map(
      ({ context, name }) => `const ${name} = get${context.name}Context()`,
    ),
    ...(uid ? ["const uid = $props.id()"] : []),
    ...modelScript.before,
    ...derived.map(({ code, fn, name }) =>
      fn
        ? `const ${name} = ${rewriteExpression(code, options)}`
        : `const ${name} = $derived(${rewriteExpression(code, options)})`,
    ),
    ...warnings.map(({ code }) =>
      /^if\b/.test(code)
        ? `if (DEV) untrack(() => {\n${rewriteStatement(code, options)}\n})`
        : `if (DEV) untrack(() => ${rewriteExpression(code, options)})`,
    ),
    ...modelScript.after,
    ...(provide
      ? [
          `set${provide.context.name}Context({\n${model.context
            .map(
              ({ code, key, text }) =>
                text ??
                `get ${key}() {\nreturn ${rewriteExpression(code, options)}\n},`,
            )
            .join("\n")}\n})`,
        ]
      : []),
  ]
  const used = helpersCalled(
    [...script, markup].join("\n"),
    helpersOf(model, { untrack: "svelte" }),
  )
  const importLines = [
    ...scriptImports(component),
    ...importLinesOf(
      used.filter(({ module }) => module === "svelte"),
      [],
    ),
    ...(usesContent ? [`import { content } from "../content.svelte"`] : []),
    ...importLinesOf(used, ["svelte"]),
    ...(hydrating.size ? [`import { hydrated } from "../svelte"`] : []),
    ...components
      .map((entry) => componentImport(entry, ".svelte"))
      .toSorted(byName),
    ...contextImports(component, "svelte", {
      provide: (name) => `set${name}Context`,
      read: (name) => `get${name}Context`,
    }),
    ...[
      ...(usesDefined ? [["../attrs", "defined"]] : []),
      ...(warnings.length ? [["../dev", "DEV"]] : []),
      ...model.helpers.always,
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
  return `<script lang="ts">\n${importLines.map((line) => `  ${line}`).join("\n")}\n\n  let {\n${lines.join("\n")}\n  }: Props = $props()\n${script.length ? `\n${script.map((line) => `  ${line}`).join("\n")}\n` : ""}</script>\n\n${markup}\n`
}
