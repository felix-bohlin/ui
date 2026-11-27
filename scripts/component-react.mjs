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
  contextLines,
  contextModule,
  devOnly,
  eventRoots,
  hydratingRoots,
  objectCode,
  propsImport,
  rewriteFragment,
  rewriteStatementFragment,
  scriptImports,
  slotOrder,
  styleOption,
  chosenSpreadCode,
} from "./component-emit.mjs"
import {
  code,
  declaration,
  declaredIn,
  importsOf,
  named,
  typed,
  uses,
} from "./component-fragment.mjs"
import { componentFunction, jsxEmitter } from "./component-jsx.mjs"
import { bindingFor, isCheckedAttribute } from "./component-models.mjs"
import { jsxAttribute } from "./example-encoders.mjs"
import { eventProp } from "./component-types.mjs"
import {
  byName,
  classText,
  filtersSpread,
  isIdentifierName,
  sourceFileOf,
  unsupported,
} from "./component-shared.mjs"

const DEFINED = named("../attrs", "defined")

const FILLED = named("../attrs", "filled")

const dependenciesOf = (text, locals) => {
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
  visit(sourceFileOf(`(${text})`, "expression.tsx"))
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
  const model = bindingFor(component, "react")
  const contextTypes = provide
    ? `${provide.context.folder ? `../${provide.context.folder}` : "."}/types`
    : undefined
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
    ...model.rename,
    ...props
      .filter(({ prop }) => prop === "class")
      .map(({ local }) => [local, "className"]),
    ...renamed,
    ...trimmedSlots.map(({ local, slot }) => [local, slotProp(slot)]),
  ])
  const options = {
    rename,
    ids: component.ids,
    slotHas: (name) => uses(`filled(${slotProp(name)})`, FILLED),
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
  const { multiRoot } = component
  const rewrite = (source) => rewriteFragment(source, options)
  const script = model.script(rewrite)
  const extraEntries = [
    ...model.props.added,
    ...(events.length ? [...handlers, "ref"] : []),
  ]
    .filter(
      (key, index, keys) =>
        keys.indexOf(key) === index &&
        !entries.some((entry) => entry.key === key),
    )
    .map((key) => ({ key, text: key }))
  const destructured = [
    ...[...entries, ...extraEntries]
      .toSorted((a, b) => byName(a.key, b.key))
      .map(({ text }) => text),
    ...slotEntries,
    ...(rest ? [`...${rest}`] : []),
  ]
  const destructuredNames = [
    ...[...entries, ...extraEntries].map(({ key }) => key),
    ...slotEntries,
    ...(rest ? [rest] : []),
  ]
  const body = [
    ...reads.map(({ context, name }) =>
      declaration(
        name,
        uses(
          `const ${name} = use${context.name}Context()`,
          named(contextModule(context, "react"), `use${context.name}Context`),
        ),
      ),
    ),
    ...(uid
      ? [
          declaration(
            "uid",
            uses("const uid = useId()", named("react", "useId")),
          ),
        ]
      : []),
    ...script.before,
    ...tagProps.map(({ local, prop, default: fallback }) =>
      declaration(
        local,
        `const ${local} = ${fallback ? `${prop} || ${fallback}` : prop}`,
      ),
    ),
    ...derived.map(({ code: source, name }) =>
      declaration(name, code`const ${name} = ${rewrite(source)}`),
    ),
    ...warnings.map(({ code: source }) =>
      devOnly(rewriteStatementFragment(source, options)),
    ),
    ...script.after,
    ...(events.length
      ? [
          declaration(
            "rootRef",
            uses(
              `const rootRef = ${hydrating.size ? "useHydrated(" : ""}${events.reduce(
                (ref, event, index) =>
                  `useListener(${ref}, ${JSON.stringify(event)}, ${handlers[index]})`,
                "ref",
              )}${hydrating.size ? ")" : ""}`,
              ...(hydrating.size ? [named("../react", "useHydrated")] : []),
              named("../react", "useListener"),
            ),
          ),
        ]
      : []),
  ]
  const hoisted = new Map()
  const filteredRest = (spread) => {
    if (!provide) return uses(code`{...defined(${spread})}`, DEFINED)
    if (!hoisted.has(spread.code)) {
      const name = ["attrs", "restAttrs", "definedAttrs"]
        .map((base) => (hoisted.size ? `${base}${hoisted.size + 1}` : base))
        .find((base) => !taken.has(base))
      hoisted.set(spread.code, { name, spread })
    }
    return code`{...${hoisted.get(spread.code).name}}`
  }
  const restType = (node, item) => {
    if (node.variable) {
      return uses(
        "HTMLAttributes<HTMLElement>",
        typed("react", "HTMLAttributes"),
      )
    }
    if (item.cast && !node.component && !node.custom) {
      return uses(
        `ComponentProps<${JSON.stringify(item.cast)}>`,
        typed("react", "ComponentProps"),
      )
    }
    return "object"
  }
  const attribute = (node, item) => {
    if (item.kind === "class") {
      const text = classText(item.code)
      if (text) return code`className={${rewrite(text)}}`
      return uses(
        code`className={cx(${rewrite(item.code)})}`,
        named("../cx", "cx"),
      )
    }
    if (item.kind === "spread") {
      const filtered = filtersSpread(node, item, component)
      if (item.condition !== undefined) {
        const chosen = chosenSpreadCode(
          item,
          code`(${item.code} as ${restType(node, item)})`,
          rewrite(item.condition),
        )
        return filtered
          ? uses(code`{...defined(${chosen})}`, DEFINED)
          : code`{...(${chosen})}`
      }
      if (
        item.code === rest &&
        (node.variable || (item.cast && !node.component && !node.custom))
      ) {
        const cast = code`${item.code} as ${restType(node, item)}`
        return filtered ? filteredRest(cast) : code`{...(${cast})}`
      }
      const spread = rewrite(item.code)
      if (filtered && item.code === rest) return filteredRest(spread)
      return filtered
        ? uses(code`{...defined(${spread})}`, DEFINED)
        : code`{...${spread}}`
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
    return code`${name}={${rewrite(item.code)}}`
  }
  const keys = new Map()
  const elementAttributes = (node) => {
    const modelAttributes = model.attributes(node, {
      attribute: (entry) => attribute(node, entry),
      rewrite,
    })
    const spreadAt = node.attributes.findIndex(
      (entry) => entry.kind === "spread" && entry.code === rest,
    )
    const listens = listened.includes(node)
    const restAt = listens ? spreadAt : -1
    const rootRef = [
      ...(hydrating.has(node) ? [hydrating.get(node)] : []),
      "ref={rootRef}",
    ]
    return [
      ...(keys.has(node) ? [`key={${keys.get(node)}}`] : []),
      ...node.attributes.flatMap((entry, index) => [
        ...(index === spreadAt ? modelAttributes.rest : []),
        ...(index === restAt ? rootRef : []),
        ...(modelAttributes.checked && isCheckedAttribute(entry)
          ? modelAttributes.checked
          : [attribute(node, entry)]),
      ]),
      ...(spreadAt === -1 ? modelAttributes.rest : []),
      ...modelAttributes.end,
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
          ({ code: source, name }) => code`const ${name} = ${rewrite(source)}`,
        ),
        list: node.list,
        parameters: `${node.item}${node.index ? `, ${node.index}` : ""}`,
      }
    },
    rewrite,
    slotCode: (name) => name,
    stringSlots,
  })
  const [rootNode] = tree
  const rendered = render(tree)
  const contextCode = provide ? rewrite(objectCode(model.context)) : undefined
  const locals = provide
    ? new Set([...destructuredNames, ...declaredIn(body)])
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
    const dependencies = dependenciesOf(contextCode.code, locals)
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
      ...[...hoisted.values()].map(({ name, spread }) =>
        declaration(
          name,
          uses(code`const ${name} = defined(${spread})`, DEFINED),
        ),
      ),
      declaration(
        contextName,
        uses(
          code`const ${contextName} = useMemo<Context>(\n  () => (${contextCode}),\n  [${dependencies.join(", ")}],\n)`,
          named("react", "useMemo"),
          typed(contextTypes, "Context"),
        ),
      ),
    )
  }
  const returned = provide
    ? uses(
        code`<${provide.context.name}Context value={${contextName}}>${rootNode.type === "if" ? code`{${rendered}}` : rendered}</${provide.context.name}Context>`,
        named(
          contextModule(provide.context, "react"),
          `${provide.context.name}Context`,
        ),
      )
    : multiRoot
      ? code`<>${rendered}</>`
      : rendered
  const needed = importsOf([...body, returned])
  const importLines = [
    ...needed.line("react"),
    ...scriptImports(component),
    ...needed.line("../attrs"),
    ...needed.line("../cx"),
    ...needed.line("../react"),
    ...components
      .map((entry) => componentImport(entry, ".react"))
      .toSorted(byName),
    ...contextLines(component, "react", needed),
    ...needed.rest(["../dev", contextTypes]),
    ...needed.merged(imports, ["../dev"]),
    propsImport(propsType, "types.react"),
    ...needed.line(contextTypes),
  ]
  const client =
    reads.length > 0 ||
    provide ||
    scripts.length > 0 ||
    events.length > 0 ||
    model.props.added.length > 0
  return `${client ? '"use client"\n\n' : ""}${importLines.join("\n")}\n\n${componentFunction(
    component.name,
    `{ ${destructured.join(", ")} }: Props`,
    body.map((line) => line.code),
    returned.code,
  )}`
}
