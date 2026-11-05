import { slotProp } from "../src/component-api/frameworks.ts"
import {
  reactKinds,
  reactPropsOf,
  resolveReactProp,
} from "./example-react-props.mjs"
import {
  componentImport,
  contextImports,
  groupWarning,
  objectCode,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  slotOrder,
  styleOption,
  withImport,
} from "./component-emit.mjs"
import { componentFunction, jsxEmitter, tagNamer } from "./component-jsx.mjs"
import { MODEL_KINDS } from "./component-models.mjs"
import {
  byName,
  chosenSpreadCode,
  REACT_ATTRIBUTE_NAMES,
  testsIn,
} from "./component-shared.mjs"

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
  const kind = MODEL_KINDS[component.model?.kind]?.react
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
  const lowered = tagNamer(component)
  const rename = new Map([
    ...(kind?.rename?.(component.model) ?? []),
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
    const reactProp =
      REACT_ATTRIBUTE_NAMES[entry.prop] ??
      (component.element && !component.baseProps?.includes(entry.prop)
        ? resolveReactProp(
            reactPropsOf(component.element, false) ?? new Map(),
            entry.prop,
          )
        : undefined) ??
      entry.prop
    if (reactProp === entry.local) {
      return {
        key: entry.local,
        text: entry.default ? `${entry.local} = ${entry.default}` : entry.local,
      }
    }
    return {
      key: entry.local,
      text: `${JSON.stringify(reactProp)}: ${entry.local}${entry.default ? ` = ${entry.default}` : ""}`,
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
            guardedTags.has(name)
              ? `const ${name} = ${lowered(name)} as ElementType`
              : `const ${name}: ElementType = ${lowered(name)}`,
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
      if (item.condition !== undefined) {
        return `{...(${chosenSpreadCode(
          item,
          `(${item.code} as object)`,
          rewriteExpression(item.condition, options),
        )})}`
      }
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
    if (item.kind === "boolean") {
      const kinds =
        node.component || node.variable || node.custom
          ? new Set()
          : reactKinds(reactPropsOf(node.tag, false) ?? new Map(), name)
      return kinds.has("string") &&
        !["any", "boolean", "other"].some((kind) => kinds.has(kind))
        ? `${name}=""`
        : name
    }
    return `${name}={${rewriteExpression(item.code, options)}}`
  }
  const elementAttributes = (node) => [
    ...(node.keyed ? [`key={${node.keyed}}`] : []),
    ...node.attributes.flatMap((entry) => [
      ...(node.groupRadio !== undefined &&
      entry.kind === "expression" &&
      entry.name === "checked"
        ? kind.radioAttributes(model, rewriteExpression(entry.code, options))
        : [attribute(node, entry)]),
      ...(node.item && entry.kind === "expression" && entry.name === "checked"
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
  ]
  const { render } = jsxEmitter({
    attributes: elementAttributes,
    each: (node, scope) => ({
      consts: node.consts.map(
        ({ code, name }) => `const ${name} = ${rewriteExpression(code, scope)}`,
      ),
      list: node.list,
      parameters: `${node.item}, ${node.index}`,
      scope,
    }),
    rewrite: rewriteExpression,
    slotCode: (name) => name,
    stringSlots,
  })
  const [rootNode] = tree
  const rendered = render(tree, options)
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
  const client =
    reads.length > 0 || provide || scripts.length > 0 || kind?.client === true
  return `${client ? '"use client"\n\n' : ""}${importLines.join("\n")}\n\n${componentFunction(component.name, `{ ${destructured.join(", ")} }: Props`, body, returned)}`
}
