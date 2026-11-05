import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import {
  componentImport,
  contextImports,
  groupWarning,
  indent,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  scriptImports,
  slotOrder,
  withImport,
} from "./component-emit.mjs"
import { MODEL_KINDS } from "./component-models.mjs"
import {
  SOLID_PRAGMA,
  byName,
  capitalize,
  chosenSpreadCode,
  codesIn,
  elementsIn,
  identifiersIn,
  isBlank,
  isIdentifierName,
  sourceFileOf,
  unsupported,
} from "./component-shared.mjs"

const NATIVE_KINDS = new Set(["checkedItem", "forward", "radioGroup"])

const propAccess = (prop) =>
  isIdentifierName(prop) ? `props.${prop}` : `props[${JSON.stringify(prop)}]`

const parameterNames = (text) => {
  const sourceFile = sourceFileOf(`(${text}) => 0`, "parameters.ts")
  const names = []
  const collect = (name) => {
    if (ts.isIdentifier(name)) names.push(name.text)
    else if (
      ts.isObjectBindingPattern(name) ||
      ts.isArrayBindingPattern(name)
    ) {
      name.elements.forEach(
        (element) => ts.isBindingElement(element) && collect(element.name),
      )
    }
  }
  const [statement] = sourceFile.statements
  const arrow =
    statement && ts.isExpressionStatement(statement)
      ? statement.expression
      : undefined
  if (arrow && ts.isArrowFunction(arrow)) {
    arrow.parameters.forEach((parameter) => collect(parameter.name))
  }
  return names
}

export const toSolid = (component) => {
  const {
    components,
    derived,
    element,
    imports,
    item,
    model,
    multiRoot,
    propsType,
    provide,
    reads,
    rest,
    slots,
    stringSlots,
    tree,
    trimmedSlots,
    uid,
    variableTags,
    warnings,
  } = component
  if (model?.refusal) throw model.refusal
  const kind = MODEL_KINDS[model?.kind]?.solid
  if (model?.kind && !kind && !NATIVE_KINDS.has(model.kind)) {
    throw unsupported(
      component.file,
      `the ${model.kind} model in Solid`,
      "solid",
      "add a solid entry to MODEL_KINDS in scripts/component-models.mjs",
    )
  }
  const inRest = kind?.inRest ? model.local : undefined
  const props = component.props.filter(
    ({ local }) => !stringSlots.includes(local),
  )
  const tagProps = props.filter(({ local }) => variableTags.includes(local))
  const tagConsts = derived.filter(({ name }) => variableTags.includes(name))
  const declared = new Set([
    ...component.props.map(({ local }) => local),
    ...slots.map((slot) => slotProp(slot)),
    ...derived.map(({ name }) => name),
    ...reads.map(({ name }) => name),
  ])
  const lowered = (name) => {
    const camel = `${name[0].toLowerCase()}${name.slice(1)}`
    return declared.has(camel) ? `${camel}Tag` : camel
  }
  const defaulted = props.filter(
    (entry) => entry.default !== undefined && !tagProps.includes(entry),
  )
  const reactive = new Set([
    ...component.props.map(({ local }) => local),
    ...reads.map(({ name }) => name),
    ...trimmedSlots.map(({ local }) => local),
    ...(rest ? [rest] : []),
  ])
  const accessors = new Set()
  for (const { code, fn, name } of derived) {
    if (fn || variableTags.includes(name)) continue
    const names = identifiersIn(code)
    if (
      code.includes("Astro.slots") ||
      [...names].some((identifier) => reactive.has(identifier))
    ) {
      reactive.add(name)
      accessors.add(name)
    }
  }
  const rename = new Map([
    ...component.props.map(({ local, prop }) => [
      local,
      defaulted.some((entry) => entry.local === local)
        ? `${local}()`
        : propAccess(prop),
    ]),
    ...tagProps.map(({ local }) => [local, `${lowered(local)}()`]),
    ...tagConsts.map(({ name }) => [name, `${lowered(name)}()`]),
    ...[...accessors].map((name) => [name, `${name}()`]),
    ...trimmedSlots.map(({ local, slot }) => [
      local,
      propAccess(slotProp(slot)),
    ]),
    ...(kind?.rename?.(model) ?? []),
  ])
  const options = {
    rename,
    slotHas: (name) => propAccess(slotProp(name)),
  }
  const rewrite = (code, scope = options) => rewriteExpression(code, scope)
  const codesOf = (nodes) => [
    ...codesIn(nodes),
    ...elementsIn(nodes).flatMap((element) =>
      element.attributes.map((entry) => entry.code ?? ""),
    ),
  ]
  const uses = (nodes, name) =>
    codesOf(nodes).some((code) => identifiersIn(code).has(name))
  let usesShow = false
  let usesLoopDynamic = false
  const omitted = [
    ...[
      ...props.filter(({ local }) => local !== inRest).map(({ prop }) => prop),
      ...(kind?.entries?.() ?? []),
      ...(item ? ["onChange"] : []),
    ]
      .filter((key, index, keys) => keys.indexOf(key) === index)
      .toSorted(byName),
    ...slotOrder(slots).map((slot) => slotProp(slot)),
  ]
  const body = [
    ...(rest
      ? [
          `const ${rest} = omit(props, ${omitted.map((key) => JSON.stringify(key)).join(", ")})`,
        ]
      : []),
    ...reads.map(
      ({ context, name }) => `const ${name} = use${context.name}Context()`,
    ),
    ...(uid ? ["const uid = createUniqueId()"] : []),
    ...(kind?.body?.(model, rewrite) ?? []),
    ...defaulted.map(
      ({ default: fallback, local, prop }) =>
        `const ${local} = () =>\n  ${propAccess(prop)} === undefined ? (${fallback}) : ${propAccess(prop)}`,
    ),
    ...tagProps.flatMap(({ default: fallback, local, prop }) => [
      `const ${lowered(local)} = () => ${fallback ? `${propAccess(prop)} || ${fallback}` : propAccess(prop)}`,
      `const ${local} = dynamic(${lowered(local)})`,
    ]),
    ...derived.flatMap(({ code, name }) =>
      variableTags.includes(name)
        ? [
            `const ${lowered(name)} = () => ${rewrite(code)}`,
            `const ${name} = dynamic(${lowered(name)})`,
          ]
        : accessors.has(name)
          ? [`const ${name} = () => ${rewrite(code)}`]
          : [`const ${name} = ${rewrite(code)}`],
    ),
    ...warnings.map(
      (code) => `untrack(() => {\n${rewriteStatement(code, options)}\n})`,
    ),
    ...(item
      ? [
          `untrack(() =>\n${groupWarning(
            component,
            item,
            rewrite(item.checked ?? "undefined"),
            rewrite(item.grouped),
          )}\n)`,
        ]
      : []),
  ]
  const attribute = (node, entry, scope) => {
    if (entry.kind === "class") return `class={${rewrite(entry.code, scope)}}`
    if (entry.kind === "spread") {
      const cast =
        entry.code === rest &&
        (node.variable ||
          entry.condition !== undefined ||
          (!node.component &&
            !node.custom &&
            !!element &&
            node.tag !== element))
      const spread = cast
        ? `(${entry.code} as object)`
        : rewrite(entry.code, scope)
      if (entry.condition !== undefined) {
        return `{...(${chosenSpreadCode(
          entry,
          spread,
          rewrite(entry.condition, scope),
        )})}`
      }
      return `{...${spread}}`
    }
    if (entry.kind === "static") {
      return `${entry.name}=${JSON.stringify(entry.value)}`
    }
    if (entry.kind === "boolean") return entry.name
    return `${entry.name}={${rewrite(entry.code, scope)}}`
  }
  const slotCode = (name) => propAccess(name)
  const wrapFragment = (code, nodes, scope) => {
    const significant = nodes.filter(
      (node) =>
        !isBlank(node) &&
        !(node.type === "slot" && stringSlots.includes(slotProp(node.name))),
    )
    const [only] = significant
    if (significant.length !== 1) return `<>${code}</>`
    if (only.type === "element") return code
    if (only.type === "if") return conditional(only, scope)
    if (only.type === "slot" && only.fallback.length === 0) {
      return slotCode(slotProp(only.name))
    }
    if (only.type === "expression") return rewrite(only.code, scope)
    return `<>${code}</>`
  }
  const conditional = (node, scope) => {
    const test = rewrite(node.test, scope)
    const name = node.test.trim()
    const accessor = /^([A-Za-z_$][\w$]*)\(\)$/.exec(
      scope.rename.get(name) ?? "",
    )?.[1]
    if (accessor && uses(node.consequent, name)) {
      usesShow = true
      const consequent = wrapFragment(
        emit(node.consequent, scope),
        node.consequent,
        scope,
      )
      const fallback = node.alternate
        ? ` fallback={${wrapFragment(emit(node.alternate, scope), node.alternate, scope)}}`
        : ""
      return `<Show when={${test}}${fallback}>{(${accessor}) => (${consequent})}</Show>`
    }
    const consequent = wrapFragment(
      emit(node.consequent, scope),
      node.consequent,
      scope,
    )
    if (!node.alternate) return `(${test}) && (${consequent})`
    const alternate = wrapFragment(
      emit(node.alternate, scope),
      node.alternate,
      scope,
    )
    return `${test} ? (${consequent}) : (${alternate})`
  }
  const emit = (nodes, scope = options) =>
    nodes
      .map((node) => {
        if (node.type === "text") {
          return node.value === " " || node.inline ? '{" "}' : node.value
        }
        if (node.type === "expression") return `{${rewrite(node.code, scope)}}`
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (stringSlots.includes(name)) {
            return nodes.some(
              (sibling) =>
                sibling.type === "expression" && sibling.code.trim() === name,
            )
              ? ""
              : `{${slotCode(name)}}`
          }
          if (node.fallback.length === 0) return `{${slotCode(name)}}`
          return `{${slotCode(name)} === undefined ? (${wrapFragment(emit(node.fallback, scope), node.fallback, scope)}) : (${slotCode(name)})}`
        }
        if (node.type === "if") return `{${conditional(node, scope)}}`
        if (node.type === "each") {
          const shadowed = [
            ...parameterNames(node.item),
            ...parameterNames(node.index),
            ...node.consts.map(({ name }) => name),
          ]
          const inner = new Map(scope.rename)
          shadowed.forEach((name) => inner.delete(name))
          const loopTags = new Set(
            elementsIn(node.children)
              .filter((element) => element.variable)
              .map((element) => element.tag),
          )
          const taken = new Set([...declared, ...shadowed])
          const loopTag = (name) => {
            const camel = `${name[0].toLowerCase()}${name.slice(1)}`
            return taken.has(camel) ? `${camel}Tag` : camel
          }
          node.consts
            .filter(({ name }) => loopTags.has(name))
            .forEach(({ name }) => inner.set(name, loopTag(name)))
          const eachScope = { ...scope, rename: inner }
          const consts = node.consts.flatMap(({ code, name }) => {
            if (!loopTags.has(name)) {
              return [`const ${name} = ${rewrite(code, eachScope)}`]
            }
            usesLoopDynamic = true
            return [
              `const ${loopTag(name)} = ${rewrite(code, eachScope)}`,
              `const ${name} = dynamic(() => ${loopTag(name)})`,
            ]
          })
          const body = wrapFragment(
            emit(node.children, eachScope),
            node.children,
            eachScope,
          )
          const returned = consts.length
            ? `{\n${consts.join("\n")}\nreturn (\n${body}\n)\n}`
            : `(\n${body}\n)`
          const usesIndex = [
            ...node.consts.map(({ code }) => code),
            ...codesIn(node.children),
            ...elementsIn(node.children).flatMap((element) =>
              element.attributes.map((entry) => entry.code ?? ""),
            ),
          ].some((code) => identifiersIn(code).has(node.index))
          return `{${rewrite(node.list, scope)}${node.optional ? "?" : ""}.map((${node.item}${usesIndex ? `, ${node.index}` : ""}) => ${returned})}`
        }
        const attributes = [
          ...node.attributes.map((entry) => attribute(node, entry, scope)),
          ...(node.model ? (kind?.attributes?.(model) ?? []) : []),
          ...(node.item
            ? [
                `onChange={(event) => {\n  ${item.parent}?.change?.(event.currentTarget)\n  callHandler(props.onChange, event)\n}}`,
              ]
            : []),
        ].join(" ")
        const open = `<${node.tag}${attributes ? ` ${attributes}` : ""}`
        return node.children.length === 0
          ? `${open} />`
          : `${open}>${emit(node.children, scope)}</${node.tag}>`
      })
      .join("")
  const [rootNode] = tree
  const rendered =
    rootNode.type === "if" ? conditional(rootNode, options) : emit(tree)
  const providedValue =
    kind?.provided && provide ? kind.provided(model, provide) : provide?.value
  const getters = (entries) =>
    `{ ${entries
      .map(({ code, key }) => {
        const value = rewrite(code)
        return value === key && !reactive.has(code)
          ? key
          : `get ${key}() { return ${value} }`
      })
      .join(", ")} }`
  const returned = provide
    ? `<${provide.context.name}Context value={${getters(providedValue)}}>${rootNode.type === "if" ? `{${rendered}}` : rendered}</${provide.context.name}Context>`
    : multiRoot
      ? `<>${rendered}</>`
      : rootNode.type === "if"
        ? `<>{${rendered}}</>`
        : rendered
  const slotRead = (name) =>
    new RegExp(`(?<![\\w$.])props\\.${name}(?![\\w$])`, "g")
  const resolvedSlots = slots
    .map((slot) => slotProp(slot))
    .filter(
      (name) =>
        [...body, returned].join("\n").match(slotRead(name))?.length > 1,
    )
  const resolveSlots = (code) =>
    resolvedSlots.reduce(
      (text, name) =>
        text.replace(slotRead(name), `resolved${capitalize(name)}()`),
      code,
    )
  const resolvedBody = [
    ...body.slice(0, rest ? 1 : 0),
    ...resolvedSlots.map(
      (name) =>
        `const resolved${capitalize(name)} = children(() => props.${name})`,
    ),
    ...body.slice(rest ? 1 : 0).map(resolveSlots),
  ]
  const solidValues = [
    ...(usesShow ? ["Show"] : []),
    ...(resolvedSlots.length ? ["children"] : []),
    ...(kind?.solidValues?.() ?? []),
    ...(rest ? ["omit"] : []),
    ...(uid ? ["createUniqueId"] : []),
    ...(warnings.length > 0 || item ? ["untrack"] : []),
  ].toSorted(byName)
  const usesDynamic =
    tagProps.length > 0 || tagConsts.length > 0 || usesLoopDynamic
  const importLines = [
    ...(usesDynamic ? [`import { dynamic } from "@solidjs/web"`] : []),
    ...(solidValues.length
      ? [`import { ${[...new Set(solidValues)].join(", ")} } from "solid-js"`]
      : []),
    ...scriptImports(component),
    ...components
      .map((entry) => componentImport(entry, ".solid"))
      .toSorted(byName),
    ...contextImports(component, "solid", {
      provide: (name) => `${name}Context`,
      read: (name) => `use${name}Context`,
    }),
    ...(kind?.imports?.(component, model) ?? []),
    ...(item ? withImport(imports, "../dev", "warnGroupedChecked") : imports),
    ...(item ? [`import { callHandler } from "../solid"`] : []),
    propsImport(propsType, "types.solid"),
  ]
  return `${SOLID_PRAGMA}\n${importLines.join("\n")}\n\nexport default function ${component.name}(props: Props) {\n${resolvedBody.map((line) => `  ${line}\n`).join("")}${resolvedBody.length ? "\n" : ""}  return (\n${indent(resolveSlots(returned), 4)}\n  )\n}\n`
}
