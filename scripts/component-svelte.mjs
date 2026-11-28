import { slotProp } from "../src/component-api/frameworks.ts"
import {
  chosenSpreadCode,
  componentImport,
  contextLines,
  contextModule,
  contextModules,
  edgeTrimmed,
  eventRoots,
  hydratingRoots,
  propsImport,
  rewriteFragment,
  rewriteStatementFragment,
  scriptImports,
  slotOrder,
  truthyNames,
} from "./component-emit.mjs"
import {
  asFragment,
  code,
  importsOf,
  join,
  named,
  typed,
  uses,
} from "./component-fragment.ts"
import { bindingFor, isCheckedAttribute } from "./component-models.mjs"
import { eventProp } from "./component-types.mjs"
import {
  byName,
  classMayBeEmpty,
  filtersSpread,
  onlyClass,
  PRESERVED_TAGS,
  propKey,
  unsupported,
} from "./component-shared.mjs"
import {
  sourceText,
  svelteAttribute,
  svelteEach,
  svelteElement,
  svelteExpression,
  svelteIf,
  svelteRender,
} from "./print-svelte.ts"

const CONTENT = named("../content.svelte", "content")

const DEFINED = named("../attrs", "defined")

const DEV = named("../dev", "DEV")

const ELEMENTS = typed("svelte/elements", "SvelteHTMLElements")

const UNTRACK = named("svelte", "untrack")

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
  const rewrite = (source) => rewriteFragment(source, options)
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
  const attribute = (node, item) => {
    if (item.kind === "class") {
      const value = rewrite(onlyClass(item.code) ?? item.code)
      if (!classMayBeEmpty(item.code)) return code`class={${value}}`
      return uses(code`{...classAttrs(${value})}`, named("../cx", "classAttrs"))
    }
    if (item.kind === "spread") {
      const cast =
        item.code === rest &&
        !node.variable &&
        !node.component &&
        !node.custom &&
        ((element && node.tag !== element) || !!item.cast)
      const filtered = filtersSpread(node, item, component)
      const value = filtered
        ? uses(
            code`defined(${item.code === rest ? rest : rewrite(item.code)})`,
            DEFINED,
          )
        : rest
      const spread = cast
        ? uses(
            code`${value} as SvelteHTMLElements[${JSON.stringify(node.tag)}]`,
            ELEMENTS,
          )
        : filtered
          ? value
          : rewrite(item.code)
      if (item.condition !== undefined) {
        const plain = !node.variable && !node.component && !node.custom
        const chosen = chosenSpreadCode(
          item,
          plain
            ? uses(
                `(${rest} as SvelteHTMLElements[${JSON.stringify(node.tag)}])`,
                ELEMENTS,
              )
            : `(${rest} as object)`,
          rewrite(item.condition),
        )
        return filtered
          ? uses(code`{...defined(${chosen})}`, DEFINED)
          : code`{...(${chosen})}`
      }
      return code`{...${spread}}`
    }
    return svelteAttribute(
      node,
      item,
      item.kind === "expression" ? rewrite(item.code) : undefined,
    )
  }
  const body = (nodes, scope, head = "") => {
    const inner = scope.preserved ? undefined : edgeTrimmed(nodes)
    const first = code`${head}`
    return inner
      ? code`\n${first.code && code`${first}\n`}${emit(inner, scope)}\n`
      : code`${first}${emit(nodes, scope)}`
  }
  const guarded = (scope, test) => ({
    ...scope,
    guards: new Set([...scope.guards, ...truthyNames(test)]),
  })
  const emit = (nodes, scope) =>
    join(
      nodes.map((node) => {
        if (node.type === "text") return sourceText(node)
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
              : uses(
                  svelteRender("content", { argument: string.prop }),
                  CONTENT,
                )
          }
          return svelteExpression(rewrite(node.code))
        }
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (
            stringSlots.some(({ slot }) => slot === node.name) ||
            component.stringTypedSlots.includes(name)
          ) {
            return uses(svelteRender("content", { argument: name }), CONTENT)
          }
          if (node.fallback.length === 0) {
            return svelteRender(name, { optional: !scope.guards.has(name) })
          }
          return svelteIf(
            name,
            `\n${svelteRender(name)}\n`,
            body(node.fallback, scope),
          )
        }
        if (node.type === "if") {
          const test = rewrite(node.test)
          return svelteIf(
            test,
            body(node.consequent, guarded(scope, test.code)),
            node.alternate && body(node.alternate, scope),
          )
        }
        if (node.type === "each") {
          const consts = join(
            node.consts.map(
              ({ code: source, name }) =>
                code`{@const ${name} = ${rewrite(source)}}`,
            ),
            "\n",
          )
          return svelteEach(node, body(node.children, scope, consts))
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
                      ? code`data-hydrating={${rewrite(hydrating.get(node))}.includes("-") ? "" : undefined}`
                      : 'data-hydrating=""',
                    uses("{@attach hydrated}", named("../svelte", "hydrated")),
                  ]
                : []),
            ]
          : []
        const attributes = join(
          [
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
          ],
          " ",
        )
        return svelteElement(node, {
          attributes,
          content: body(node.children, {
            ...scope,
            preserved: scope.preserved || PRESERVED_TAGS.has(node.tag),
          }),
          emptyElements: "foreign",
          rewrite,
        })
      }),
    )
  const markup = emit(tree, { guards: new Set(), preserved: false })
  const lines = [
    ...entries.map((entry) => `    ${entry},`),
    ...(slotEntries.length
      ? ["", "    // Snippets", ...slotEntries.map((entry) => `    ${entry},`)]
      : []),
    ...(rest ? [`    ...${rest}`] : []),
  ]
  const modelScript = model.script(rewrite)
  const script = [
    ...reads.map(({ context, name }) =>
      uses(
        `const ${name} = get${context.name}Context()`,
        named(contextModule(context, "svelte"), `get${context.name}Context`),
      ),
    ),
    ...(uid ? ["const uid = $props.id()"] : []),
    ...modelScript.before,
    ...derived.map(({ code: source, fn, name }) =>
      fn
        ? code`const ${name} = ${rewrite(source)}`
        : code`const ${name} = $derived(${rewrite(source)})`,
    ),
    ...warnings.map(({ code: source }) =>
      uses(
        /^if\b/.test(source)
          ? code`if (DEV) untrack(() => {\n${rewriteStatementFragment(source, options)}\n})`
          : code`if (DEV) untrack(() => ${rewrite(source)})`,
        DEV,
        UNTRACK,
      ),
    ),
    ...modelScript.after,
    ...(provide
      ? [
          uses(
            code`set${provide.context.name}Context({\n${join(
              model.context.map(
                ({ code: source, key, text }) =>
                  text ?? code`get ${key}() {\nreturn ${rewrite(source)}\n},`,
              ),
              "\n",
            )}\n})`,
            named(
              contextModule(provide.context, "svelte"),
              `set${provide.context.name}Context`,
            ),
          ),
        ]
      : []),
  ].map(asFragment)
  const needed = importsOf([...script, markup])
  const importLines = [
    ...scriptImports(component),
    ...needed.line("svelte"),
    ...needed.line("../content.svelte"),
    ...needed.rest([
      "../attrs",
      "../cx",
      "../dev",
      "svelte/elements",
      ...contextModules(component, "svelte"),
    ]),
    ...components
      .map((entry) => componentImport(entry, ".svelte"))
      .toSorted(byName),
    ...contextLines(component, "svelte", needed),
    ...needed.merged(imports, ["../attrs", "../dev", "../cx"]),
    propsImport(propsType, "types.svelte"),
    ...needed.line("svelte/elements"),
  ]
  return `<script lang="ts">\n${importLines.map((line) => `  ${line}`).join("\n")}\n\n  let {\n${lines.join("\n")}\n  }: Props = $props()\n${script.length ? `\n${script.map((line) => `  ${line.code}`).join("\n")}\n` : ""}</script>\n\n${markup.code}\n`
}
