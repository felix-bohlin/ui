import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import {
  reactAttributeName,
  reactBareAttribute,
  reactKinds,
  reactPropsOf,
} from "./example-react-props.mjs"
import {
  componentImport,
  contextImports,
  eventRoots,
  groupWarning,
  hydratingRoots,
  objectCode,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  scriptImports,
  slotOrder,
  styleOption,
  withImport,
} from "./component-emit.mjs"
import { componentFunction, jsxEmitter } from "./component-jsx.mjs"
import {
  helpersCalled,
  importLinesOf,
  MODEL_KINDS,
  modelHelpers,
  namesFrom,
} from "./component-models.mjs"
import { jsxAttribute } from "./example-encoders.mjs"
import { eventProp } from "./component-types.mjs"
import {
  byName,
  chosenSpreadCode,
  classText,
  filtersSpread,
  isIdentifierName,
  sourceFileOf,
  unsupported,
} from "./component-shared.mjs"

const declaredNames = (code) => {
  const [declaration] = sourceFileOf(code, "component.tsx").statements
  const names = new Set()
  const bind = (name) => {
    if (ts.isIdentifier(name)) names.add(name.text)
    else {
      name.elements.forEach(
        (element) => ts.isBindingElement(element) && bind(element.name),
      )
    }
  }
  declaration.parameters.forEach((parameter) => bind(parameter.name))
  declaration.body.statements.forEach((statement) => {
    if (ts.isVariableStatement(statement)) {
      statement.declarationList.declarations.forEach((entry) =>
        bind(entry.name),
      )
    }
  })
  return names
}

const dependenciesOf = (code, locals) => {
  const found = new Set()
  const visit = (node) => {
    if (
      ts.isIdentifier(node) &&
      locals.has(node.text) &&
      !(
        ts.isPropertyAccessExpression(node.parent) && node.parent.name === node
      ) &&
      !(ts.isPropertyAssignment(node.parent) && node.parent.name === node)
    ) {
      let chain = node
      while (
        ts.isPropertyAccessExpression(chain.parent) &&
        chain.parent.expression === chain &&
        !(
          ts.isCallExpression(chain.parent.parent) &&
          chain.parent.parent.expression === chain.parent
        )
      ) {
        chain = chain.parent
      }
      found.add(chain.getText())
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFileOf(`(${code})`, "expression.tsx"))
  return [...found].toSorted(byName)
}

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
    ({ local }) => !stringSlots.some((entry) => entry.local === local),
  )
  const tagProps = props.filter(({ local }) => variableTags.includes(local))
  const reactPropOf = (entry) =>
    reactAttributeName(
      component.baseProps?.includes(entry.prop) ? undefined : component.element,
      entry.prop,
    )
  const taken = component.declared
  const events = component.events ?? []
  const listened = eventRoots(component)
  const hydrating = new Map(
    [...hydratingRoots(component, listened)].map(([node, tag]) => [
      node,
      tag
        ? `data-hydrating={${tag}.includes("-") ? "" : undefined}`
        : 'data-hydrating=""',
    ]),
  )
  const handlers = events.map((event) => eventProp("react", event))
  const clash = ["ref", "rootRef", ...handlers].find(
    (name) => events.length > 0 && taken.has(name),
  )
  if (clash) {
    throw unsupported(
      "BC301",
      component.file,
      `the name \`${clash}\`, which the React port also declares for its events`,
      "rename the prop or const in the Astro file",
    )
  }
  const renamed = new Map(
    props
      .filter(
        (entry) =>
          entry.prop !== "class" &&
          !tagProps.includes(entry) &&
          entry.local === entry.prop &&
          isIdentifierName(reactPropOf(entry)) &&
          !taken.has(reactPropOf(entry)),
      )
      .map((entry) => [entry.local, reactPropOf(entry)]),
  )
  const rename = new Map([
    ...(kind?.rename?.(component.model) ?? []),
    ...props
      .filter(({ prop }) => prop === "class")
      .map(({ local }) => [local, "className"]),
    ...renamed,
    ...trimmedSlots.map(({ local, slot }) => [local, slotProp(slot)]),
  ])
  const options = {
    rename,
    ids: component.ids,
    slotHas: (name) => slotProp(name),
    style: styleOption(component, "style ?? {}"),
  }
  const entries = props.map((entry) => {
    if (entry.prop === "class") return { key: "className", text: "className" }
    if (tagProps.includes(entry)) return { key: entry.prop, text: entry.prop }
    const reactProp = reactPropOf(entry)
    const local = renamed.get(entry.local) ?? entry.local
    if (reactProp === local) {
      return {
        key: local,
        text: entry.default ? `${local} = ${entry.default}` : local,
      }
    }
    return {
      key: entry.local,
      text: `${JSON.stringify(reactProp)}: ${entry.local}${entry.default ? ` = ${entry.default}` : ""}`,
    }
  })
  const slotEntries = slotOrder(slots).map((slot) => slotProp(slot))
  const { item, model, multiRoot } = component
  const defaultGrouped = item
    ? rewriteExpression(item.defaultGrouped, options)
    : undefined
  const extraEntries = [
    ...(kind?.entries?.() ?? []),
    ...(item ? ["defaultChecked", "onChange"] : []),
    ...(events.length ? handlers : []),
    ...(events.length || item ? ["ref"] : []),
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
        `const ${local} = ${fallback ? `${prop} || ${fallback}` : prop}`,
    ),
    ...derived.map(
      ({ code, name }) => `const ${name} = ${rewriteExpression(code, options)}`,
    ),
    ...warnings.map(({ code }) => rewriteStatement(code, options)),
    ...(item
      ? [
          groupWarning(
            component,
            item,
            `${item.checked ?? "undefined"} ?? defaultChecked`,
          ),
        ]
      : []),
    ...(events.length
      ? [
          `const rootRef = ${hydrating.size ? "useHydrated(" : ""}${events.reduce(
            (ref, event, index) =>
              `useListener(${ref}, ${JSON.stringify(event)}, ${handlers[index]})`,
            "ref",
          )}${hydrating.size ? ")" : ""}`,
        ]
      : []),
  ]
  let usesCx = false
  let usesDefined = false
  const reactTypes = new Set()
  const hoisted = new Map()
  const filteredRest = (code) => {
    if (!provide) return `{...defined(${code})}`
    if (!hoisted.has(code)) {
      const name = ["attrs", "restAttrs", "definedAttrs"]
        .map((base) => (hoisted.size ? `${base}${hoisted.size + 1}` : base))
        .find((base) => !taken.has(base))
      hoisted.set(code, name)
    }
    return `{...${hoisted.get(code)}}`
  }
  const restType = (node, item) => {
    if (node.variable) {
      reactTypes.add("HTMLAttributes")
      return "HTMLAttributes<HTMLElement>"
    }
    if (item.cast && !node.component && !node.custom) {
      reactTypes.add("ComponentProps")
      return `ComponentProps<${JSON.stringify(item.cast)}>`
    }
    return "object"
  }
  const attribute = (node, item) => {
    if (item.kind === "class") {
      const text = classText(item.code)
      if (text) return `className={${rewriteExpression(text, options)}}`
      usesCx = true
      return `className={cx(${rewriteExpression(item.code, options)})}`
    }
    if (item.kind === "spread") {
      const filtered = filtersSpread(node, item, component)
      if (filtered) usesDefined = true
      if (item.condition !== undefined) {
        const chosen = chosenSpreadCode(
          item,
          `(${item.code} as ${restType(node, item)})`,
          rewriteExpression(item.condition, options),
        )
        return filtered ? `{...defined(${chosen})}` : `{...(${chosen})}`
      }
      if (node.variable && item.code === rest) {
        const cast = `${item.code} as ${restType(node, item)}`
        return filtered ? filteredRest(cast) : `{...(${cast})}`
      }
      const code = rewriteExpression(item.code, options)
      if (filtered && item.code === rest) return filteredRest(code)
      return filtered ? `{...defined(${code})}` : `{...${code}}`
    }
    const name = node.component
      ? item.name
      : reactAttributeName(
          node.variable || node.custom ? undefined : node.tag,
          item.name,
        )
    if (item.kind === "static") return jsxAttribute(name, item.value)
    if (item.kind === "boolean") {
      const kinds =
        node.component || node.variable || node.custom
          ? new Set()
          : reactKinds(reactPropsOf(node.tag, false) ?? new Map(), name)
      return reactBareAttribute(name, kinds) ?? name
    }
    return `${name}={${rewriteExpression(item.code, options)}}`
  }
  const keys = new Map()
  const elementAttributes = (node) => {
    const listens = listened.includes(node)
    const restAt = listens
      ? node.attributes.findIndex(
          (entry) => entry.kind === "spread" && entry.code === rest,
        )
      : -1
    const rootRef = [
      ...(hydrating.has(node) ? [hydrating.get(node)] : []),
      "ref={rootRef}",
    ]
    return [
      ...(keys.has(node) ? [`key={${keys.get(node)}}`] : []),
      ...node.attributes.flatMap((entry, index) => [
        ...(index === restAt ? rootRef : []),
        ...(node.groupRadio !== undefined &&
        entry.kind === "expression" &&
        entry.name === "checked"
          ? kind.radioAttributes(
              model,
              rewriteExpression(node.groupRadio, options),
              rewriteExpression(entry.code, options),
            )
          : [attribute(node, entry)]),
        ...(node.item && entry.kind === "expression" && entry.name === "checked"
          ? [
              `defaultChecked={${item.grouped} !== undefined ? undefined : ${item.checked ? `${item.checked} === undefined ? (${defaultGrouped} ?? defaultChecked) : defaultChecked` : `(${defaultGrouped} ?? defaultChecked)`}}`,
            ]
          : []),
      ]),
      ...(node.item
        ? [
            "ref={ref}",
            `onChange={(event) => {\n  ${item.parent}?.change?.(event.currentTarget)\n  onChange?.(event)\n}}`,
          ]
        : []),
      ...(node.external
        ? [
            'dangerouslySetInnerHTML={{ __html: "" }}',
            "suppressHydrationWarning",
          ]
        : []),
      ...(listens && restAt === -1 ? rootRef : []),
    ]
  }
  const { render } = jsxEmitter({
    attributes: elementAttributes,
    each: (node) => {
      keys.set(node.row, node.index)
      return {
        consts: node.consts.map(
          ({ code, name }) =>
            `const ${name} = ${rewriteExpression(code, options)}`,
        ),
        list: node.list,
        parameters: `${node.item}${node.index ? `, ${node.index}` : ""}`,
      }
    },
    rewrite: (code) => rewriteExpression(code, options),
    slotCode: (name) => name,
    stringSlots,
  })
  const [rootNode] = tree
  const rendered = render(tree)
  const providedValue =
    kind?.provided && provide ? kind.provided(model, provide) : provide?.value
  const contextCode = provide
    ? rewriteExpression(objectCode(providedValue), options)
    : undefined
  const locals = provide
    ? declaredNames(
        `function f({ ${destructured.join(", ")} }) {\n${body.join("\n")}\n}`,
      )
    : undefined
  const contextName = ["context", "contextValue", "providedContext"].find(
    (name) => !locals?.has(name),
  )
  if (provide) {
    if (
      locals.has("Context") ||
      imports.some((line) => /\bContext\b/.test(line))
    ) {
      throw unsupported(
        "BC301",
        component.file,
        "the name `Context`, which the React port imports for the type of its provided value",
        "rename the prop, const or import in the Astro file",
      )
    }
    const dependencies = dependenciesOf(contextCode, locals)
    if (dependencies.includes(rest)) {
      throw unsupported(
        "BC405",
        component.file,
        `\`${rest}\` itself in the provided context value, an object that is new on every render, so the memo of the React port would never hold`,
        `read a member of it (\`${rest}.id\`) or destructure the attribute in the Astro file`,
      )
    }
    const unstable = derived.find(
      ({ name, newEachRender }) => newEachRender && dependencies.includes(name),
    )
    if (unstable) {
      throw unsupported(
        "BC405",
        component.file,
        `the const \`${unstable.name}\` in the provided context value, a function, an object or an array that is new on every render, itself or through a condition or another const, so the memo of the React port would never hold`,
        "provide the primitive values it is built from in the Astro file",
      )
    }
    body.push(
      ...[...hoisted].map(([code, name]) => `const ${name} = defined(${code})`),
      `const ${contextName} = useMemo<Context>(\n  () => (${contextCode}),\n  [${dependencies.join(", ")}],\n)`,
    )
  }
  const returned = provide
    ? `<${provide.context.name}Context value={${contextName}}>${rootNode.type === "if" ? `{${rendered}}` : rendered}</${provide.context.name}Context>`
    : multiRoot
      ? `<>${rendered}</>`
      : rendered
  const used = helpersCalled(
    [...body, returned].join("\n"),
    modelHelpers("react", component),
  )
  const reactValues = [
    ...(uid ? ["useId"] : []),
    ...(provide ? ["useMemo"] : []),
    ...namesFrom(used, "react"),
    ...[...reactTypes].map((name) => `type ${name}`),
  ].toSorted((a, b) => byName(a.replace(/^type /, ""), b.replace(/^type /, "")))
  const reactHelpers = [
    ...(hydrating.size ? ["useHydrated"] : []),
    ...(events.length ? ["useListener"] : []),
  ].toSorted(byName)
  const reactImport = reactValues.length
    ? reactValues.every((name) => name.startsWith("type "))
      ? `import type { ${reactValues.map((name) => name.slice(5)).join(", ")} } from "react"`
      : `import { ${reactValues.join(", ")} } from "react"`
    : undefined
  const importLines = [
    ...(reactImport ? [reactImport] : []),
    ...scriptImports(component),
    ...(usesDefined ? [`import { defined } from "../attrs"`] : []),
    ...(usesCx ? [`import { cx } from "../cx"`] : []),
    ...(reactHelpers.length
      ? [`import { ${reactHelpers.join(", ")} } from "../react"`]
      : []),
    ...components
      .map((entry) => componentImport(entry, ".react"))
      .toSorted(byName),
    ...contextImports(component, "react", {
      provide: (name) => `${name}Context`,
      read: (name) => `use${name}Context`,
    }),
    ...importLinesOf(used, ["react"]),
    ...(item ? withImport(imports, "../dev", "warnGroupedChecked") : imports),
    propsImport(propsType, "types.react"),
    ...(provide
      ? [
          `import type { Context } from "${provide.context.folder ? `../${provide.context.folder}` : "."}/types"`,
        ]
      : []),
  ]
  const client =
    reads.length > 0 ||
    provide ||
    scripts.length > 0 ||
    events.length > 0 ||
    kind?.client === true
  return `${client ? '"use client"\n\n' : ""}${importLines.join("\n")}\n\n${componentFunction(component.name, `{ ${destructured.join(", ")} }: Props`, body, returned)}`
}
