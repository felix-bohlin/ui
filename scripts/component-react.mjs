import { slotProp } from "../src/component-api/frameworks.ts"
import { reactPropsOf, resolveReactProp } from "./example-react-props.mjs"
import {
  componentImport,
  contextImports,
  groupWarning,
  indent,
  objectCode,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  slotOrder,
  styleOption,
  withImport,
} from "./component-emit.mjs"
import { kindOf, MODEL_KINDS } from "./component-models.mjs"
import { byName, isBlank, testsIn } from "./component-shared.mjs"

const REACT_ATTRIBUTE_NAMES = { class: "className", for: "htmlFor" }

export const toReact = (component) => {
  const {
    components,
    derived,
    imports,
    propsType,
    provide,
    reads,
    rest,
    scripts,
    slots,
    stringSlots,
    tree,
    trimmedSlots,
    uid,
    variableTags,
    warnings,
  } = component
  if (component.model?.everywhere) throw component.model.refusal
  const kind = MODEL_KINDS[kindOf(component.model)]?.react
  const props = component.props.filter(
    ({ local }) =>
      !stringSlots.includes(local) &&
      !(kind?.inRest && local === component.model.local),
  )
  const tagProps = props.filter(({ local }) => variableTags.includes(local))
  const tagConsts = derived.filter(({ name }) => variableTags.includes(name))
  const guardedTags = new Set(
    testsIn(tree).filter((test) =>
      tagConsts.some(({ name }) => name === test.trim()),
    ),
  )
  const lowered = (name) => `${name[0].toLowerCase()}${name.slice(1)}`
  const rename = new Map([
    ...props
      .filter(({ prop }) => prop === "class")
      .map(({ local }) => [local, "className"]),
    ...tagConsts.map(({ name }) => [name, lowered(name)]),
    ...trimmedSlots.map(({ local, slot }) => [local, slotProp(slot)]),
  ])
  const options = {
    rename,
    slotHas: (name) => slotProp(name),
    style: styleOption(component, "style ?? {}"),
  }
  const entries = props.map((entry) => {
    if (entry.prop === "class") return { key: "className", text: "className" }
    if (tagProps.includes(entry)) return { key: entry.prop, text: entry.prop }
    const reactProp = REACT_ATTRIBUTE_NAMES[entry.prop] ?? entry.prop
    if (reactProp === entry.local) {
      return {
        key: entry.local,
        text: entry.default ? `${entry.local} = ${entry.default}` : entry.local,
      }
    }
    if (entry.local !== entry.prop) {
      return {
        key: entry.local,
        text: `${JSON.stringify(reactProp)}: ${entry.local}${entry.default ? ` = ${entry.default}` : ""}`,
      }
    }
    return {
      key: entry.prop,
      text: entry.default ? `${entry.prop} = ${entry.default}` : entry.prop,
    }
  })
  const slotEntries = slotOrder(slots).map((slot) => slotProp(slot))
  const { item, model, multiRoot } = component
  const extraEntries = [
    ...(kind?.entries?.() ?? []),
    ...(item ? ["defaultChecked", "onChange"] : []),
  ]
    .filter((key) => !entries.some((entry) => entry.key === key))
    .map((key) => ({ key, text: key }))
  const destructured = [
    ...[...entries, ...extraEntries]
      .toSorted((a, b) => byName(a.key, b.key))
      .map(({ text }) => text),
    ...slotEntries,
    ...(rest ? [`...${rest}`] : []),
  ]
  const body = [
    ...reads.map(
      ({ context, name }) => `const ${name} = use${context.name}Context()`,
    ),
    ...(uid ? ["const uid = useId()"] : []),
    ...(kind?.body?.(model) ?? []),
    ...tagProps.map(
      ({ local, prop, default: fallback }) =>
        `const ${local}: ElementType = ${fallback ? `${prop} || ${fallback}` : prop}`,
    ),
    ...derived.flatMap(({ code, name }) =>
      variableTags.includes(name)
        ? [
            `const ${lowered(name)} = ${rewriteExpression(code, options)}`,
            `const ${name}: ElementType${guardedTags.has(name) ? " | undefined" : ""} = ${lowered(name)}`,
          ]
        : [`const ${name} = ${rewriteExpression(code, options)}`],
    ),
    ...warnings.map((code) => rewriteStatement(code, options)),
    ...(item
      ? [
          groupWarning(
            component,
            item,
            `${item.checked ?? "undefined"} ?? defaultChecked`,
          ),
        ]
      : []),
    ...scripts.map(
      (specifier) =>
        `useEffect(() => {\n  void import(${JSON.stringify(specifier)})\n}, [])`,
    ),
  ]
  let usesCx = false
  const attribute = (node, item) => {
    if (item.kind === "class") {
      usesCx = true
      return `className={cx(${rewriteExpression(item.code, options)})}`
    }
    if (item.kind === "spread") {
      return node.variable && item.code === rest
        ? `{...(${item.code} as object)}`
        : `{...${rewriteExpression(item.code, options)}}`
    }
    const name = node.component
      ? item.name
      : (REACT_ATTRIBUTE_NAMES[item.name] ??
        (node.variable || node.custom
          ? item.name
          : (resolveReactProp(
              reactPropsOf(node.tag, false) ?? new Map(),
              item.name,
            ) ?? item.name)))
    if (item.kind === "static") return `${name}=${JSON.stringify(item.value)}`
    if (item.kind === "boolean") return name
    return `${name}={${rewriteExpression(item.code, options)}}`
  }
  const wrapFragment = (code, nodes) => {
    const significant = nodes.filter(
      (node) =>
        !isBlank(node) &&
        !(node.type === "slot" && stringSlots.includes(slotProp(node.name))),
    )
    const [only] = significant
    if (significant.length !== 1) return `<>${code}</>`
    if (only.type === "element") return code
    if (only.type === "if") return conditional(only)
    if (only.type === "slot" && only.fallback.length === 0) {
      return slotProp(only.name)
    }
    if (only.type === "expression") return rewriteExpression(only.code, options)
    return `<>${code}</>`
  }
  const conditional = (node) => {
    const test = rewriteExpression(node.test, options)
    const consequent = wrapFragment(emit(node.consequent), node.consequent)
    if (!node.alternate) return `(${test}) && (${consequent})`
    const alternate = wrapFragment(emit(node.alternate), node.alternate)
    return `${test} ? (${consequent}) : (${alternate})`
  }
  const emit = (nodes) =>
    nodes
      .map((node) => {
        if (node.type === "text") {
          return node.value === " " || node.inline ? '{" "}' : node.value
        }
        if (node.type === "expression") {
          return `{${rewriteExpression(node.code, options)}}`
        }
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (stringSlots.includes(name)) {
            return nodes.some(
              (sibling) =>
                sibling.type === "expression" && sibling.code.trim() === name,
            )
              ? ""
              : `{${name}}`
          }
          if (node.fallback.length === 0) return `{${name}}`
          return `{${name} === undefined ? (${wrapFragment(emit(node.fallback), node.fallback)}) : (${name})}`
        }
        if (node.type === "if") return `{${conditional(node)}}`
        if (node.type === "each") {
          const consts = node.consts.map(
            ({ code, name }) =>
              `const ${name} = ${rewriteExpression(code, options)}`,
          )
          const body = wrapFragment(emit(node.children), node.children)
          const returned = consts.length
            ? `{\n${consts.join("\n")}\nreturn (\n${body}\n)\n}`
            : `(\n${body}\n)`
          return `{${node.list}${node.optional ? "?" : ""}.map((${node.item}, index) => ${returned})}`
        }
        const attributes = [
          ...(node.keyed ? ["key={index}"] : []),
          ...node.attributes.flatMap((entry) => [
            attribute(node, entry),
            ...(node.item &&
            entry.kind === "expression" &&
            entry.name === "checked"
              ? [
                  `defaultChecked={${item.grouped} === undefined ? defaultChecked : undefined}`,
                ]
              : []),
          ]),
          ...(node.item
            ? [
                `onChange={(event) => {\n  ${item.parent}?.change?.(event.currentTarget)\n  onChange?.(event)\n}}`,
              ]
            : []),
        ].join(" ")
        const open = `<${node.tag}${attributes ? ` ${attributes}` : ""}`
        return node.children.length === 0
          ? `${open} />`
          : `${open}>${emit(node.children)}</${node.tag}>`
      })
      .join("")
  const [rootNode] = tree
  const rendered = rootNode.type === "if" ? conditional(rootNode) : emit(tree)
  const providedValue =
    kind?.provided && provide ? kind.provided(model, provide) : provide?.value
  const returned = provide
    ? `<${provide.context.name}Context value={${rewriteExpression(objectCode(providedValue), options)}}>${rootNode.type === "if" ? `{${rendered}}` : rendered}</${provide.context.name}Context>`
    : multiRoot
      ? `<>${rendered}</>`
      : rendered
  const reactValues = [
    ...(scripts.length ? ["useEffect"] : []),
    ...(uid ? ["useId"] : []),
    ...(kind?.reactValues?.() ?? []),
  ]
  const usesElementType = tagProps.length > 0 || tagConsts.length > 0
  const reactImport = reactValues.length
    ? `import { ${[...(usesElementType ? ["type ElementType"] : []), ...reactValues].join(", ")} } from "react"`
    : usesElementType
      ? `import type { ElementType } from "react"`
      : undefined
  const importLines = [
    ...(reactImport ? [reactImport] : []),
    ...(usesCx ? [`import { cx } from "../cx"`] : []),
    ...components
      .map((entry) => componentImport(entry, ".react"))
      .toSorted(byName),
    ...contextImports(component, "react", {
      provide: (name) => `${name}Context`,
      read: (name) => `use${name}Context`,
    }),
    ...(kind?.imports?.(component, model) ?? []),
    ...(item ? withImport(imports, "../dev", "warnGroupedChecked") : imports),
    propsImport(propsType, "types.react"),
  ]
  const client = reads.length > 0 || provide || scripts.length > 0
  return `${client ? '"use client"\n\n' : ""}${importLines.join("\n")}\n\nexport default function ${component.name}({ ${destructured.join(", ")} }: Props) {\n${body.map((line) => `  ${line}\n`).join("")}${body.length ? "\n" : ""}  return (\n${indent(returned, 4)}\n  )\n}\n`
}
