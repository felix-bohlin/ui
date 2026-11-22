import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import {
  componentImport,
  contextImports,
  groupWarning,
  hydratingRoots,
  propsImport,
  rewriteExpression,
  rewriteStatement,
  scriptImports,
  slotOrder,
  withImport,
} from "./component-emit.mjs"
import { componentFunction, jsxEmitter, tagNamer } from "./component-jsx.mjs"
import {
  helpersCalled,
  importLinesOf,
  MODEL_KINDS,
  modelHelpers,
  namesFrom,
} from "./component-models.mjs"
import { jsxAttribute } from "./example-encoders.mjs"
import {
  SOLID_PRAGMA,
  allCodes,
  byName,
  capitalize,
  chosenSpreadCode,
  classMayBeEmpty,
  codesIn,
  elementsIn,
  filtersSpread,
  identifierCounts,
  itemBinding,
  identifiersIn,
  isIdentifierName,
  onlyClass,
  slotsUsedIn,
  sourceFileOf,
  unsupported,
  unwrap,
} from "./component-shared.mjs"

const PER_ITEM = "\u0000"

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

const CONDITION_OPERATORS = [
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.QuestionQuestionToken,
]

const isCondition = (code) => {
  const [statement] = sourceFileOf(`(${code})`, "condition.ts").statements
  let expression =
    statement && ts.isExpressionStatement(statement)
      ? statement.expression
      : undefined
  while (
    expression &&
    (ts.isParenthesizedExpression(expression) ||
      ts.isAsExpression(expression) ||
      ts.isNonNullExpression(expression))
  ) {
    expression = expression.expression
  }
  return (
    !!expression &&
    (ts.isConditionalExpression(expression) ||
      (ts.isBinaryExpression(expression) &&
        CONDITION_OPERATORS.includes(expression.operatorToken.kind)))
  )
}

const expressionOf = (code) => {
  const [statement] = sourceFileOf(`(${code})`, "expression.ts").statements
  return statement && ts.isExpressionStatement(statement)
    ? unwrap(statement.expression)
    : undefined
}

const passesAsArgument = (code, name) => {
  const visit = (node) =>
    (ts.isCallExpression(node) &&
      node.arguments.some(
        (argument) => ts.isIdentifier(argument) && argument.text === name,
      )) ||
    !!ts.forEachChild(node, visit)
  return visit(sourceFileOf(`(${code})`, "argument.ts"))
}

const arrowOf = (code) => {
  const arrow = expressionOf(code)
  if (!arrow || !ts.isArrowFunction(arrow) || ts.isBlock(arrow.body)) {
    return undefined
  }
  const text = arrow.getSourceFile().text
  return {
    body: arrow.body.getText(),
    head: text.slice(arrow.getStart(), arrow.equalsGreaterThanToken.end),
  }
}

const slotsIn = (nodes) =>
  nodes.flatMap((node) => {
    if (node.type === "slot") {
      return [slotProp(node.name), ...slotsIn(node.fallback)]
    }
    if (node.type === "if") {
      return [...slotsIn(node.consequent), ...slotsIn(node.alternate ?? [])]
    }
    return node.children ? slotsIn(node.children) : []
  })

const isReserved = (name) =>
  ts.identifierToKeywordKind(ts.factory.createIdentifier(name)) !== undefined

const staticTag = (code) => /^"([a-z][a-z0-9-]*)"$/.exec(code.trim())?.[1]

const shortName = (attribute) =>
  attribute
    .replace(/^(aria|data)-/, "")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part, index) => (index ? capitalize(part) : part))
    .join("")

const SPREAD_OF_PROPS =
  /\{\s*\.\.\.rest,(\s*([A-Za-z_$][\w$]*): props\.\2,?)+\s*\}/g

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
  const hydrating = hydratingRoots(component)
  const kind = MODEL_KINDS[model?.kind]?.solid
  if (model?.kind && !kind) {
    throw unsupported(
      "BC402",
      component.file,
      `the ${model.kind} model in Solid`,
      "add a solid entry to MODEL_KINDS in scripts/component-models.mjs",
    )
  }
  const props = component.props.filter(
    ({ local }) => !stringSlots.includes(local),
  )
  const tagProps = props.filter(({ local }) => variableTags.includes(local))
  const staticTags = new Map(
    derived
      .filter(
        ({ code, name }) => variableTags.includes(name) && staticTag(code),
      )
      .map(({ code, name }) => [name, staticTag(code)]),
  )
  const tagConsts = derived.filter(
    ({ name }) => variableTags.includes(name) && !staticTags.has(name),
  )
  const lowered = tagNamer(component)
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
      [...names].some(
        (identifier) =>
          reactive.has(identifier) ||
          reactive.has(component.ids.bases.get(identifier)),
      )
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
    hoisted: [],
    ids: component.ids,
    rename,
    slotHas: (name) => propAccess(slotProp(name)),
  }
  const rewrite = (code, scope = options) => rewriteExpression(code, scope)
  const taken = new Set([
    ...component.props.map(({ local }) => local),
    ...derived.map(({ name }) => name),
    ...reads.map(({ name }) => name),
  ])
  const local = (kind?.locals?.(model) ?? []).find((name) => taken.has(name))
  if (local) {
    throw unsupported(
      "BC301",
      component.file,
      `the name \`${local}\`, which the Solid port also declares for its ${model.prop} model`,
      "rename the prop or const in the Astro file",
    )
  }
  const narrowed = (name, code) => {
    const once = [...identifierCounts(code)]
      .filter(([read, count]) => count > 1 && rename.get(read)?.endsWith("()"))
      .map(([read]) => [read, read === "value" ? "current" : `${read}Value`])
    if (once.length === 0) return { locals: [], value: rewrite(code) }
    const clash = once.find(
      ([, local]) => taken.has(local) || identifiersIn(code).has(local),
    )
    if (clash) {
      throw unsupported(
        "BC301",
        component.file,
        `the name ${clash[1]}`,
        `rename it: the Solid port reads ${clash[0]}() once into ${clash[1]} where ${name} reads it twice`,
      )
    }
    const scope = { ...options, rename: new Map([...rename, ...once]) }
    return {
      locals: once.map(
        ([read, local]) => `const ${local} = ${rename.get(read)}`,
      ),
      value: rewrite(code, scope),
    }
  }
  const functionBody = ({ locals, value }) =>
    locals.length ? `{\n${locals.join("\n")}\nreturn ${value}\n}` : value
  const accessorCode = (name, code) =>
    `const ${name} = () => ${functionBody(narrowed(name, code))}`
  const functionCode = (name, code) => {
    const arrow = arrowOf(code)
    const parts = arrow && narrowed(name, arrow.body)
    return parts?.locals.length
      ? `const ${name} = ${arrow.head} ${functionBody(parts)}`
      : `const ${name} = ${rewrite(code)}`
  }
  const reactiveIn = (code, scope) =>
    code.includes("Astro.slots") ||
    [...identifiersIn(code)].some(
      (name) => name === rest || (scope.rename.get(name) ?? name) !== name,
    )
  const codesOf = (nodes) => [
    ...codesIn(nodes),
    ...elementsIn(nodes).flatMap((element) =>
      element.attributes.map((entry) => entry.code ?? ""),
    ),
  ]
  let usesChildren = false
  let usesFor = false
  let usesOmit = false
  let usesShow = false
  let usesCx = false
  let usesDefined = false
  let usesDynamicComponent = false
  const omitted = [
    ...[
      ...props.map(({ prop }) => prop),
      ...(kind?.entries?.() ?? []),
      ...(kind?.omits?.(model) ?? []),
      ...(item ? ["defaultChecked", "onChange", "ref"] : []),
      ...(hydrating.size ? ["ref"] : []),
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
    ...derived.flatMap(({ code, fn, name }) =>
      staticTags.has(name)
        ? allCodes(component).some((other) => identifiersIn(other).has(name))
          ? [`const ${name} = ${code}`]
          : []
        : variableTags.includes(name)
          ? [
              `const ${lowered(name)} = () => ${rewrite(code)}`,
              `const ${name} = dynamic(${lowered(name)})`,
            ]
          : accessors.has(name)
            ? [accessorCode(name, code)]
            : [
                fn
                  ? functionCode(name, code)
                  : `const ${name} = ${rewrite(code)}`,
              ],
    ),
    ...warnings.map(
      (code) =>
        `untrack(() => {\n${rewriteStatement(code, options).replace(SPREAD_OF_PROPS, "props")}\n})`,
    ),
    ...(item
      ? [
          `untrack(() =>\n${groupWarning(
            component,
            item,
            `${rewrite(item.checked ?? "undefined")} ?? props.defaultChecked`,
            rewrite(item.grouped),
          )}\n)`,
        ]
      : []),
  ]
  const hoistedNames = new Set()
  const freeName = (scope, bases, used = []) => {
    const names = scope.names ?? hoistedNames
    const free = (name) =>
      !isReserved(name) &&
      !taken.has(name) &&
      !names.has(name) &&
      !used.includes(name) &&
      !scope.shadowed?.includes(name)
    let name = bases.find(free)
    for (let count = 2; !name; count += 1) {
      if (free(`${bases[0]}${count}`)) name = `${bases[0]}${count}`
    }
    return name
  }
  const declare = (scope, bases, code, line) => {
    const known = scope.hoisted.find((entry) => entry.code === code)
    if (known) return known.name
    const name = freeName(scope, bases)
    const names = scope.names ?? hoistedNames
    names.add(name)
    scope.hoisted.push({ code, line: line(name), name })
    return name
  }
  const hoist = (node, entry, code, scope) =>
    declare(
      scope,
      [
        shortName(entry.name),
        `${node.tag[0].toLowerCase()}${node.tag.slice(1)}${capitalize(shortName(entry.name))}`,
        ...(scope.loop ? [`item${capitalize(shortName(entry.name))}`] : []),
      ],
      code,
      (name) => `const ${name} = () => ${code}`,
    )
  const controlOf = (read, initial, scope) => {
    const code = `control(${read}, untrack(() => ${initial}))`
    return declare(
      scope,
      [scope.loop ? "itemCheckedControl" : "checkedControl"],
      code,
      (name) => `const ${name} = ${code}`,
    )
  }
  const attribute = (node, entry, scope) => {
    if (entry.kind === "class") {
      const only = onlyClass(entry.code)
      if (only !== undefined) return `class={${rewrite(only, scope)}}`
      const code = rewrite(entry.code, scope)
      if (!classMayBeEmpty(entry.code)) return `class={${code}}`
      usesCx = true
      return `class={cx(${code})}`
    }
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
      const filtered = filtersSpread(node, entry, component)
      if (filtered) usesDefined = true
      if (entry.condition !== undefined) {
        const chosen = chosenSpreadCode(
          entry,
          spread,
          rewrite(entry.condition, scope),
        )
        return filtered ? `{...defined(${chosen})}` : `{...(${chosen})}`
      }
      if (!filtered) return `{...${spread}}`
      return `{...defined(${cast ? `${entry.code} as object` : spread})}`
    }
    if (entry.kind === "static") return jsxAttribute(entry.name, entry.value)
    if (entry.kind === "boolean") return entry.name
    const code = rewrite(entry.code, scope)
    if (
      (node.component || node.variable) &&
      isCondition(code) &&
      reactiveIn(entry.code, scope)
    ) {
      return `${entry.name}={${hoist(node, entry, code, scope)}()}`
    }
    return `${entry.name}={${code}}`
  }
  const slotRead = (name, scope, rendered) => {
    if (scope?.itemSlots?.has(name)) {
      usesChildren = true
      const read = `${PER_ITEM}${propAccess(name)}`
      return `${declare(
        scope,
        [`resolved${capitalize(name)}`],
        read,
        (resolved) => `const ${resolved} = children(() => ${read})`,
      )}()`
    }
    return rendered && scope?.loop
      ? `${PER_ITEM}${propAccess(name)}`
      : propAccess(name)
  }
  const narrow = (node, scope, branch) => {
    const name = node.test.trim()
    const accessor = /^([A-Za-z_$][\w$]*)\(\)$/.exec(
      scope.rename.get(name) ?? "",
    )?.[1]
    if (
      !accessor ||
      !(
        elementsIn(node.consequent).some(
          (element) => element.variable && element.tag === name,
        ) ||
        codesOf(node.consequent).some((code) => passesAsArgument(code, name))
      )
    ) {
      return undefined
    }
    usesShow = true
    const fallback = node.alternate
      ? ` fallback={${branch(node.alternate, scope)}}`
      : ""
    const shown = freeName(scope, [`shown${capitalize(accessor)}`])
    const inner = {
      ...scope,
      rename: new Map([...scope.rename, [name, `${shown}()`]]),
      shadowed: [...(scope.shadowed ?? []), shown],
    }
    return `<Show when={${rewrite(node.test, scope)}}${fallback}>{(${shown}) => (${branch(node.consequent, inner)})}</Show>`
  }
  const each = (node, scope) => {
    const declared = [
      ...parameterNames(node.item),
      ...(node.index ? parameterNames(node.index) : []),
      ...node.consts.map(({ name }) => name),
    ]
    const binding = itemBinding(node.item)
    if (!binding) {
      throw unsupported(
        "BC203",
        component.file,
        `the loop item \`${node.item}\`, which Solid reads through an accessor`,
        "take the item as one name, or as an object pattern of plain names",
      )
    }
    const row =
      binding.name ?? freeName(scope, ["item", "entry", "row"], declared)
    const shadowed = [...declared, row]
    const inner = new Map(scope.rename)
    shadowed.forEach((name) => inner.delete(name))
    inner.set(binding.name ?? row, `${row}()`)
    binding.fields.forEach(({ key, local }) =>
      inner.set(local, `${row}().${key}`),
    )
    if (binding.rest) {
      usesOmit = true
      inner.set(binding.rest, `${binding.rest}()`)
    }
    const rowConsts = binding.rest
      ? [
          `const ${binding.rest} = () => omit(${[`${row}()`, ...binding.fields.map(({ key }) => JSON.stringify(key))].join(", ")})`,
        ]
      : []
    const loopTags = new Set(
      elementsIn(node.children)
        .filter((element) => element.variable)
        .map((element) => element.tag),
    )
    const loopTag = tagNamer(component, shadowed)
    const usesIndex = [
      ...node.consts.map(({ code }) => code),
      ...codesOf(node.children),
    ].some((code) => identifiersIn(code).has(node.index))
    const slotReads = [
      ...slotsIn(node.children),
      ...[...node.consts.map(({ code }) => code), ...codesOf(node.children)]
        .flatMap(slotsUsedIn)
        .map(slotProp),
    ]
    const eachScope = {
      ...scope,
      hoisted: [],
      itemSlots: new Set([
        ...(scope.itemSlots ?? []),
        ...slotReads.filter(
          (name, index) =>
            !stringSlots.includes(name) && slotReads.indexOf(name) !== index,
        ),
      ]),
      loop: true,
      loopTags: new Map(scope.loopTags),
      names: new Set(scope.names ?? hoistedNames),
      rename: inner,
      shadowed: [...(scope.shadowed ?? []), ...shadowed],
    }
    eachScope.slotHas = (name) => slotRead(slotProp(name), eachScope)
    const consts = node.consts.map(({ code, name }) => {
      const local = loopTags.has(name) ? loopTag(name) : name
      const value = rewrite(code, eachScope)
      if (reactiveIn(code, eachScope)) {
        inner.set(name, `${local}()`)
        if (loopTags.has(name)) eachScope.loopTags.set(name, `${local}()`)
        return `const ${local} = () => ${value}`
      }
      if (loopTags.has(name)) {
        inner.set(name, local)
        eachScope.loopTags.set(name, local)
      }
      return `const ${local} = ${value}`
    })
    return {
      get consts() {
        return [
          ...rowConsts,
          ...consts,
          ...eachScope.hoisted.map(({ line }) => line),
        ]
      },
      keyed: "false",
      list: rewrite(node.list, scope),
      parameters: `${row}${usesIndex ? `, ${node.index}` : ""}`,
      scope: eachScope,
    }
  }
  const { render } = jsxEmitter({
    attributes: (node, scope) => {
      const restAt = node.attributes.findIndex(
        (entry) => entry.kind === "spread" && entry.code === rest,
      )
      const modelAttributes = node.model
        ? (kind?.attributes?.(model) ?? [])
        : []
      const checks = (entry) =>
        entry.kind === "expression" && entry.name === "checked"
      const loopTag = node.variable && scope.loopTags?.get(node.tag)
      const checked = node.item && node.attributes.find(checks)
      const itemControl =
        checked &&
        controlOf(
          `() => ${rewrite(checked.code, scope)}`,
          `${rewrite(item.defaultGrouped, scope)} ?? props.defaultChecked`,
          scope,
        )
      const guard = hydrating.has(node)
        ? [
            `{...hydrating(${hydrating.get(node) ? `${rewrite(hydrating.get(node), scope)}.includes("-")` : ""})}`,
            "ref={[props.ref, hydrated]}",
          ]
        : []
      return [
        ...(loopTag ? [`component={${loopTag}}`] : []),
        ...node.attributes.flatMap((entry, index) => [
          ...(index === restAt ? [...modelAttributes, ...guard] : []),
          ...(node.groupRadio !== undefined && checks(entry)
            ? kind.radioAttributes(
                model,
                rewrite(node.groupRadio, scope),
                controlOf(
                  `() => ${kind.radioChecked(model, rewrite(entry.code, scope))}`,
                  rewrite(entry.code, scope),
                  scope,
                ),
              )
            : node.item && checks(entry)
              ? [`{...${itemControl}.server}`]
              : [attribute(node, entry, scope)]),
        ]),
        ...(restAt === -1 ? [...modelAttributes, ...guard] : []),
        ...(node.item
          ? [
              itemControl
                ? `ref={[props.ref, ${itemControl}.ref]}`
                : "ref={props.ref}",
              `onChange={(event) => {\n  ${item.parent}?.change?.(event.currentTarget)\n  callHandler(props.onChange, event)\n}}`,
            ]
          : []),
      ]
    },
    each,
    tag: (node, scope) => {
      if (!node.variable) return node.tag
      if (scope.loopTags?.has(node.tag)) {
        usesDynamicComponent = true
        return "Dynamic"
      }
      return staticTags.get(node.tag) ?? node.tag
    },
    loop: ({ keyed, list, parameters, returned }) => {
      usesFor = true
      return `<For each={${list}}${keyed ? ` keyed={${keyed}}` : ""}>{(${parameters}) => ${returned}}</For>`
    },
    narrow,
    rewrite,
    slotCode: slotRead,
    stringSlots,
  })
  const [rootNode] = tree
  const rendered = render(tree, options)
  body.push(...options.hoisted.map(({ line }) => line))
  const providedValue =
    kind?.provided && provide ? kind.provided(model, provide) : provide?.value
  const inlined = new Map(
    (providedValue ?? []).flatMap(({ code }) => {
      const source = derived.find(({ name }) => name === code.trim())
      if (!source || !accessors.has(source.name)) return []
      const line = accessorCode(source.name, source.code)
      const read = new RegExp(`(?<![\\w$.])${source.name}\\(`)
      const others = [...body.filter((other) => other !== line), rendered]
      return others.some((other) => read.test(other))
        ? []
        : [[source.name, { line, parts: narrowed(source.name, source.code) }]]
    }),
  )
  inlined.forEach(({ line }) => body.splice(body.indexOf(line), 1))
  const getters = (entries) =>
    `{ ${entries
      .map(({ code, key }) => {
        const own = inlined.get(code.trim())
        if (own) {
          return `get ${key}() { ${[...own.parts.locals, `return ${own.parts.value}`].join("\n")} }`
        }
        const value = rewrite(code)
        return value === key && !reactive.has(code)
          ? key
          : `get ${key}() { return ${value} }`
      })
      .join(", ")} }`
  const provided = (content) =>
    `<${provide.context.name}Context value={${getters(providedValue)}}>${content}</${provide.context.name}Context>`
  const returned = provide
    ? provided(rootNode.type === "if" ? `{${rendered}}` : rendered)
    : multiRoot
      ? `<>${rendered}</>`
      : rootNode.type === "if"
        ? `<>{${rendered}}</>`
        : rendered
  const slotPattern = (name, marker = `(?<![\\w$.${PER_ITEM}])`) =>
    new RegExp(`${marker}props\\.${name}(?![\\w$])`, "g")
  const emitted = [...body, returned].join("\n")
  const resolvedSlots = slots
    .map((slot) => slotProp(slot))
    .filter((name) => emitted.match(slotPattern(name))?.length > 1)
  const resolveSlots = (code) =>
    resolvedSlots
      .reduce(
        (text, name) =>
          text.replace(slotPattern(name), `resolved${capitalize(name)}()`),
        code,
      )
      .replaceAll(PER_ITEM, "")
  const resolvedLines = resolvedSlots.map(
    (name) =>
      `const resolved${capitalize(name)} = children(() => props.${name})`,
  )
  const lines = body.slice(rest ? 1 : 0).map(resolveSlots)
  const underProvider = () => {
    const moved = new Set(
      resolvedSlots.map((name) => `resolved${capitalize(name)}`),
    )
    const inner = lines.filter((line) => {
      if (![...identifiersIn(line)].some((name) => moved.has(name))) {
        return false
      }
      const declared = /^const ([A-Za-z_$][\w$]*) =/.exec(line)?.[1]
      if (declared) moved.add(declared)
      return true
    })
    const read = [...identifiersIn(getters(providedValue))].find((name) =>
      moved.has(name),
    )
    if (read) {
      throw unsupported(
        "BC403",
        component.file,
        `a context value that reads ${read}, which reads a slot the Solid port resolves under the provider`,
        "provide a value that reads no slot",
      )
    }
    const content = declare(options, ["content"], "", () => "")
    return {
      body: [
        ...lines.filter((line) => !inner.includes(line)),
        `const ${content} = () => {\n${[...resolvedLines, ...inner].join("\n")}\nreturn (\n${resolveSlots(rendered)}\n)\n}`,
      ],
      returned: provided(`{${content}()}`),
    }
  }
  const scoped =
    provide && resolvedSlots.length > 0 ? underProvider() : undefined
  const resolvedBody = [
    ...body.slice(0, rest ? 1 : 0),
    ...(scoped ? scoped.body : [...resolvedLines, ...lines]),
  ]
  const resolvedReturn = scoped ? scoped.returned : resolveSlots(returned)
  const used = helpersCalled(
    [...resolvedBody, resolvedReturn].join("\n"),
    modelHelpers("solid", component),
  )
  const solidValues = [
    ...(usesFor ? ["For"] : []),
    ...(usesShow ? ["Show"] : []),
    ...(resolvedSlots.length || usesChildren ? ["children"] : []),
    ...namesFrom(used, "solid-js"),
    ...(rest || usesOmit ? ["omit"] : []),
    ...(uid ? ["createUniqueId"] : []),
  ].toSorted(byName)
  const solidHelpers = [
    ...namesFrom(used, "../solid"),
    ...(item ? ["callHandler"] : []),
    ...(hydrating.size ? ["hydrated", "hydrating"] : []),
  ].toSorted(byName)
  const webValues = [
    ...(tagProps.length > 0 || tagConsts.length > 0 ? ["dynamic"] : []),
    ...(usesDynamicComponent ? ["Dynamic"] : []),
  ].toSorted(byName)
  const importLines = [
    ...(webValues.length
      ? [`import { ${webValues.join(", ")} } from "@solidjs/web"`]
      : []),
    ...(solidValues.length
      ? [`import { ${[...new Set(solidValues)].join(", ")} } from "solid-js"`]
      : []),
    ...scriptImports(component),
    ...(usesDefined ? [`import { defined } from "../attrs"`] : []),
    ...components
      .map((entry) => componentImport(entry, ".solid"))
      .toSorted(byName),
    ...contextImports(component, "solid", {
      provide: (name) => `${name}Context`,
      read: (name) => `use${name}Context`,
    }),
    ...importLinesOf(used, ["../solid", "solid-js"]),
    ...[
      ...(item ? [["../dev", "warnGroupedChecked"]] : []),
      ...(usesCx ? [["../cx", "cx"]] : []),
    ].reduce(
      (lines, [module, name]) => withImport(lines, module, name),
      imports,
    ),
    ...(solidHelpers.length
      ? [`import { ${[...new Set(solidHelpers)].join(", ")} } from "../solid"`]
      : []),
    propsImport(propsType, "types.solid"),
  ]
  return `${SOLID_PRAGMA}\n${importLines.join("\n")}\n\n${componentFunction(component.name, "props: Props", resolvedBody, resolvedReturn)}`
}
