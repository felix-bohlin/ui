import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import {
  chosenSpreadCode,
  componentImport,
  contextLines,
  contextModule,
  hydratingRoots,
  propsImport,
  rewriteFragment,
  rewriteStatementFragment,
  scriptImports,
  slotOrder,
} from "./component-emit.mjs"
import {
  arrowBody,
  asFragment,
  code,
  declaration,
  fragment,
  importsOf,
  join,
  named,
  reads,
  slotReads,
  uses,
} from "./component-fragment.ts"
import {
  componentFunction,
  componentPrinter,
  tagNamer,
} from "./component-jsx.mjs"
import { bindingFor, isCheckedAttribute } from "./component-models.mjs"
import { allValues, valuesIn } from "./component-analysis.mjs"
import {
  byName,
  capitalize,
  classMayBeEmpty,
  elementsIn,
  filtersSpread,
  identifierCounts,
  itemBinding,
  isIdentifierName,
  onlyClass,
  sourceFileOf,
  unsupported,
  unwrap,
} from "./component-shared.mjs"
import { JSX_DIALECTS, jsxAttributeCode, jsxName } from "./print-jsx.mjs"

const SOLID = JSX_DIALECTS.solid

const CONTROL = named("../solid", "control")

const propAccess = (prop) =>
  isIdentifierName(prop) ? `props.${prop}` : `props[${JSON.stringify(prop)}]`

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

const shortName = (attribute) =>
  attribute
    .replace(/^(aria|data)-/, "")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part, index) => (index ? capitalize(part) : part))
    .join("")

const DEFINED = named("../attrs", "defined")

const FILLED = named("../attrs", "filled")

const SOLID_JS = (name) => named("solid-js", name)

const TOP = "top"

const call = (name) => ({ ...reads(`${name}()`, name), accessor: name })

const slotRead = (prop, scope = TOP) =>
  fragment(propAccess(prop), { slots: [{ scope, slot: prop }] })

const resolvedName = (prop) => `resolved${capitalize(prop)}`

const resolvedRead = (prop) =>
  fragment(`${resolvedName(prop)}()`, {
    declarations: [resolvedName(prop)],
    slots: [{ scope: TOP, slot: prop }],
  })

export const toSolid = (component) => {
  const first = solidFile(component, new Set())
  const counts = slotReads(first.parts, (scope) => scope === TOP)
  const resolved = component.slots
    .map((slot) => slotProp(slot))
    .filter((name) => counts.get(name) > 1)
  return resolved.length
    ? solidFile(component, new Set(resolved)).text
    : first.text
}

const solidFile = (component, resolvedSlots) => {
  const {
    components,
    derived,
    element,
    imports,
    multiRoot,
    propsType,
    provide,
    reads: contextReads,
    rest,
    slots,
    stringSlots,
    tree,
    trimmedSlots,
    uid,
    variableTags,
    warnings,
  } = component
  const model = bindingFor(component, "solid")
  const hydrating = hydratingRoots(component)
  const props = component.props.filter(
    ({ local }) => !stringSlots.some((entry) => entry.local === local),
  )
  const tagProps = props.filter(({ local }) => variableTags.includes(local))
  const staticTags = new Map(
    derived
      .filter(({ name, staticTag }) => variableTags.includes(name) && staticTag)
      .map(({ name, staticTag }) => [name, staticTag]),
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
    ...contextReads.map(({ name }) => name),
    ...trimmedSlots.map(({ local }) => local),
    ...(rest ? [rest] : []),
  ])
  const accessors = new Set()
  for (const { fn, name, reads: valueReads } of derived) {
    if (fn || variableTags.includes(name)) continue
    if (
      valueReads.contexts.length > 0 ||
      valueReads.props.length > 0 ||
      valueReads.rest ||
      valueReads.slots.length > 0 ||
      valueReads.derived.some((read) => accessors.has(read))
    ) {
      reactive.add(name)
      accessors.add(name)
    }
  }
  const stringSlotProps = new Set(stringSlots.map(({ prop }) => prop))
  const slotAccess = (prop) =>
    resolvedSlots.has(prop) ? resolvedRead(prop) : slotRead(prop)
  const renameWith = (access) =>
    new Map([
      ...component.props.map(({ local, prop }) => [
        local,
        defaulted.some((entry) => entry.local === local)
          ? call(local)
          : stringSlotProps.has(prop)
            ? access(prop)
            : propAccess(prop),
      ]),
      ...tagProps.map(({ local }) => [local, call(lowered(local))]),
      ...tagConsts.map(({ name }) => [name, call(lowered(name))]),
      ...[...accessors].map((name) => [name, call(name)]),
      ...trimmedSlots.map(({ local, slot }) => [local, access(slotProp(slot))]),
      ...model.rename,
    ])
  const rename = renameWith(slotAccess)
  const unresolved = renameWith(slotRead)
  const declared = new Set([
    ...(rest ? [rest] : []),
    ...contextReads.map(({ name }) => name),
    ...(uid ? ["uid"] : []),
    ...model.declares,
    ...derived.map(({ name }) => name),
  ])
  const optionsWith = (renames, access) => ({
    declared,
    hoisted: [],
    ids: component.ids,
    rename: renames,
    slotHas: (name) => uses(code`filled(${access(slotProp(name))})`, FILLED),
  })
  const options = optionsWith(rename, slotAccess)
  const providerOptions = optionsWith(unresolved, slotRead)
  const rewrite = (source, scope = options) => rewriteFragment(source, scope)
  const taken = component.declared
  const script = model.script(rewrite)
  const narrowed = (name, source, names, base = options) => {
    const once = [...names]
      .filter(
        ([read, count]) =>
          count > 1 && rename.get(read)?.accessor !== undefined,
      )
      .map(([read]) => [read, read === "value" ? "current" : `${read}Value`])
    if (once.length === 0) return { locals: [], value: rewrite(source, base) }
    const clash = once.find(([, local]) => taken.has(local) || names.has(local))
    if (clash) {
      throw unsupported(
        "BC301",
        component.file,
        `the name ${clash[1]}`,
        `rename it: the Solid port reads ${clash[0]}() once into ${clash[1]} where ${name} reads it twice`,
      )
    }
    const scope = {
      ...base,
      rename: new Map([...base.rename, ...once]),
    }
    return {
      locals: once.map(
        ([read, local]) => code`const ${local} = ${rename.get(read)}`,
      ),
      value: rewrite(source, scope),
    }
  }
  const functionBody = ({ locals, value }) =>
    locals.length
      ? code`{\n${join(locals, "\n")}\nreturn ${value}\n}`
      : arrowBody(value)
  const accessorCode = ({ code: source, name, reads: valueReads }) =>
    declaration(
      name,
      code`const ${name} = () => ${functionBody(narrowed(name, source, valueReads.names))}`,
    )
  const functionCode = (name, source) => {
    const arrow = arrowOf(source)
    const parts =
      arrow && narrowed(name, arrow.body, identifierCounts(arrow.body))
    return declaration(
      name,
      parts?.locals.length
        ? code`const ${name} = ${arrow.head} ${functionBody(parts)}`
        : code`const ${name} = ${rewrite(source)}`,
    )
  }
  const reactiveIn = ({ reads: valueReads }, scope) =>
    valueReads.slots.length > 0 ||
    [...valueReads.names.keys()].some(
      (name) =>
        name === rest ||
        asFragment(scope.rename.get(name) ?? name).code !== name,
    )
  const valuesOf = (nodes) => [
    ...valuesIn(nodes),
    ...elementsIn(nodes).flatMap((element) =>
      element.attributes.filter((entry) => entry.code !== undefined),
    ),
  ]
  const omitted = [
    ...[
      ...props.map(({ prop }) => prop),
      ...model.props.added,
      ...(hydrating.size ? ["ref"] : []),
    ]
      .filter((key, index, keys) => keys.indexOf(key) === index)
      .toSorted(byName),
    ...slotOrder(slots).map((slot) => slotProp(slot)),
  ]
  const accessorLines = new Map()
  const body = [
    ...(rest
      ? [
          declaration(
            rest,
            uses(
              `const ${rest} = omit(props, ${omitted.map((key) => JSON.stringify(key)).join(", ")})`,
              SOLID_JS("omit"),
            ),
          ),
        ]
      : []),
    ...contextReads.map(({ context, name }) =>
      declaration(
        name,
        uses(
          `const ${name} = use${context.name}Context()`,
          named(contextModule(context, "solid"), `use${context.name}Context`),
        ),
      ),
    ),
    ...(uid
      ? [
          declaration(
            "uid",
            uses("const uid = createUniqueId()", SOLID_JS("createUniqueId")),
          ),
        ]
      : []),
    ...script.before,
    ...defaulted.map(({ default: fallback, local, prop }) =>
      declaration(
        local,
        `const ${local} = () =>\n  ${propAccess(prop)} === undefined ? (${fallback}) : ${propAccess(prop)}`,
      ),
    ),
    ...tagProps.flatMap(({ default: fallback, local, prop }) => [
      declaration(
        lowered(local),
        `const ${lowered(local)} = () => ${fallback ? `${propAccess(prop)} || ${fallback}` : propAccess(prop)}`,
      ),
      declaration(
        local,
        uses(
          `const ${local} = dynamic(${lowered(local)})`,
          named("@solidjs/web", "dynamic"),
        ),
      ),
    ]),
    ...derived.flatMap((value) => {
      const { code: source, fn, name } = value
      if (staticTags.has(name)) {
        return allValues(component).some(({ reads: other }) =>
          other.names.has(name),
        )
          ? [declaration(name, `const ${name} = ${source}`)]
          : []
      }
      if (variableTags.includes(name)) {
        return [
          declaration(
            lowered(name),
            code`const ${lowered(name)} = () => ${arrowBody(rewrite(source))}`,
          ),
          declaration(
            name,
            uses(
              `const ${name} = dynamic(${lowered(name)})`,
              named("@solidjs/web", "dynamic"),
            ),
          ),
        ]
      }
      if (accessors.has(name)) {
        const line = accessorCode(value)
        accessorLines.set(name, line)
        return [line]
      }
      return [
        fn
          ? functionCode(name, source)
          : declaration(name, code`const ${name} = ${rewrite(source)}`),
      ]
    }),
    ...warnings.map(({ code: source }) =>
      uses(
        code`if (DEV) untrack(() => {\n${rewriteStatementFragment(source, {
          ...options,
          wholeProps: {
            props: (name) =>
              asFragment(unresolved.get(name)).code === `props.${name}`,
            rest,
          },
        })}\n})`,
        named("../dev", "DEV"),
        SOLID_JS("untrack"),
      ),
    ),
    ...script.after,
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
  const declare = (scope, bases, key, line) => {
    const known = scope.hoisted.find((entry) => entry.key === key)
    if (known) return known.name
    const name = freeName(scope, bases)
    const names = scope.names ?? hoistedNames
    names.add(name)
    scope.hoisted.push({ key, line: declaration(name, line(name)), name })
    return name
  }
  const hoist = (node, entry, value, scope) =>
    declare(
      scope,
      [
        shortName(entry.name),
        `${node.tag[0].toLowerCase()}${node.tag.slice(1)}${capitalize(shortName(entry.name))}`,
        ...(scope.loop ? [`item${capitalize(shortName(entry.name))}`] : []),
      ],
      value.code,
      (name) => code`const ${name} = () => ${arrowBody(value)}`,
    )
  const controlOf = (read, initial, scope) => {
    const control = uses(code`control(${read}, () => ${initial})`, CONTROL)
    const name = declare(
      scope,
      [scope.loop ? "itemCheckedControl" : "checkedControl"],
      control.code,
      (declared) => code`const ${declared} = ${control}`,
    )
    return reads(name, name)
  }
  const attribute = (node, entry, scope) => {
    if (entry.kind === "class") {
      const only = onlyClass(entry.code)
      if (only !== undefined) return code`class={${rewrite(only, scope)}}`
      const value = rewrite(entry.code, scope)
      if (!classMayBeEmpty(entry.code)) return code`class={${value}}`
      return uses(code`class={cx(${value})}`, named("../cx", "cx"))
    }
    if (entry.kind === "spread") {
      const cast =
        entry.code === rest &&
        (node.variable ||
          entry.condition !== undefined ||
          (!!entry.cast && !node.component && !node.custom) ||
          (!node.component &&
            !node.custom &&
            !!element &&
            node.tag !== element))
      const spread = cast
        ? reads(`(${entry.code} as object)`, entry.code)
        : rewrite(entry.code, scope)
      const filtered = filtersSpread(node, entry, component)
      if (entry.condition !== undefined) {
        const chosen = chosenSpreadCode(
          entry,
          spread,
          rewrite(entry.condition, scope),
        )
        return filtered
          ? uses(code`{...defined(${chosen})}`, DEFINED)
          : code`{...(${chosen})}`
      }
      if (!filtered) return code`{...${spread}}`
      return uses(
        code`{...defined(${cast ? reads(`${entry.code} as object`, entry.code) : spread})}`,
        DEFINED,
      )
    }
    const value =
      entry.kind === "expression" ? rewrite(entry.code, scope) : undefined
    return jsxAttributeCode(
      SOLID,
      {
        item: entry,
        name: jsxName(SOLID, undefined, entry.name, "keep"),
        value:
          value &&
          (node.component || node.variable) &&
          isCondition(value.code) &&
          reactiveIn(entry, scope)
            ? call(hoist(node, entry, value, scope))
            : value,
        where: `<${node.tag}>`,
      },
      {
        policy: "keep",
        refuse: (what) => unsupported("BC201", component.file, what),
      },
    )
  }
  const slotCode = (name, scope, rendered) => {
    if (scope?.itemSlots?.has(name)) {
      const read = slotRead(name, scope)
      return call(
        declare(
          scope,
          [resolvedName(name)],
          `children(${read.code})`,
          (resolved) =>
            uses(
              code`const ${resolved} = children(() => ${read})`,
              SOLID_JS("children"),
            ),
        ),
      )
    }
    return rendered && scope?.loop ? slotRead(name, scope) : slotAccess(name)
  }
  const narrow = (node, scope, branch) => {
    const name = node.test.trim()
    const accessor = scope.rename.get(name)?.accessor
    if (
      !accessor ||
      !(
        elementsIn(node.consequent).some(
          (element) => element.variable && element.tag === name,
        ) ||
        valuesOf(node.consequent).some(({ code: source }) =>
          passesAsArgument(source, name),
        )
      )
    ) {
      return undefined
    }
    const fallback = node.alternate
      ? code` fallback={${branch(node.alternate, scope)}}`
      : ""
    const shown = freeName(scope, [`shown${capitalize(accessor)}`])
    const inner = {
      ...scope,
      rename: new Map([...scope.rename, [name, call(shown)]]),
      shadowed: [...(scope.shadowed ?? []), shown],
    }
    return uses(
      code`<Show when={${rewrite(node.test, scope)}}${fallback}>{(${shown}) => (${branch(node.consequent, inner)})}</Show>`,
      SOLID_JS("Show"),
    )
  }
  const each = (node, scope) => {
    const declares = node.declares
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
      binding.name ?? freeName(scope, ["item", "entry", "row"], declares)
    const shadowed = [...declares, row]
    const inner = new Map(scope.rename)
    shadowed.forEach((name) => inner.delete(name))
    inner.set(binding.name ?? row, call(row))
    binding.fields.forEach(({ key, local }) =>
      inner.set(local, `${row}().${key}`),
    )
    if (binding.rest) inner.set(binding.rest, call(binding.rest))
    const rowConsts = binding.rest
      ? [
          uses(
            `const ${binding.rest} = () => omit(${[`${row}()`, ...binding.fields.map(({ key }) => JSON.stringify(key))].join(", ")})`,
            SOLID_JS("omit"),
          ),
        ]
      : []
    const loopTags = new Set(
      elementsIn(node.children)
        .filter((element) => element.variable)
        .map((element) => element.tag),
    )
    const loopTag = tagNamer(component, shadowed)
    const loopValues = [...node.consts, ...valuesOf(node.children)]
    const usesIndex = loopValues.some(({ reads: valueReads }) =>
      valueReads.names.has(node.index),
    )
    const slotsRead = [
      ...slotsIn(node.children),
      ...loopValues.flatMap(({ reads: valueReads }) =>
        valueReads.slots.map(slotProp),
      ),
    ]
    const eachScope = {
      ...scope,
      hoisted: [],
      itemSlots: new Set([
        ...(scope.itemSlots ?? []),
        ...slotsRead.filter(
          (name, index) =>
            !stringSlots.some(({ prop }) => prop === name) &&
            slotsRead.indexOf(name) !== index,
        ),
      ]),
      loop: true,
      loopTags: new Map(scope.loopTags),
      names: new Set(scope.names ?? hoistedNames),
      rename: inner,
      shadowed: [...(scope.shadowed ?? []), ...shadowed],
    }
    eachScope.slotHas = (name) =>
      uses(code`filled(${slotCode(slotProp(name), eachScope)})`, FILLED)
    const consts = node.consts.map((entry) => {
      const { code: source, name } = entry
      const local = loopTags.has(name) ? loopTag(name) : name
      const value = rewrite(source, eachScope)
      if (reactiveIn(entry, eachScope)) {
        inner.set(name, call(local))
        if (loopTags.has(name)) eachScope.loopTags.set(name, `${local}()`)
        return code`const ${local} = () => ${arrowBody(value)}`
      }
      if (loopTags.has(name)) {
        inner.set(name, local)
        eachScope.loopTags.set(name, local)
      }
      return code`const ${local} = ${value}`
    })
    return {
      get consts() {
        return [
          ...rowConsts,
          ...consts,
          ...eachScope.hoisted.map(({ line }) => line),
        ]
      },
      list: rewrite(node.list, scope),
      parameters: `${row}${usesIndex ? `, ${node.index}` : ""}`,
      scope: eachScope,
    }
  }
  const { render } = componentPrinter(SOLID, {
    attributes: (node, scope) => {
      const restAt = node.attributes.findIndex(
        (entry) => entry.kind === "spread" && entry.code === rest,
      )
      const modelAttributes = model.attributes(node, {
        control: (read, initial) => controlOf(read, initial, scope),
        rewrite: (source) => rewrite(source, scope),
      })
      const loopTag = node.variable && scope.loopTags?.get(node.tag)
      const guard = hydrating.has(node)
        ? [
            uses(
              code`{...hydrating(${hydrating.get(node) ? code`${rewrite(hydrating.get(node), scope)}.includes("-")` : ""})}`,
              named("../solid", "hydrating"),
            ),
            uses("ref={[props.ref, hydrated]}", named("../solid", "hydrated")),
          ]
        : []
      return [
        ...(loopTag ? [`component={${loopTag}}`] : []),
        ...node.attributes.flatMap((entry, index) => [
          ...(index === restAt ? [...modelAttributes.rest, ...guard] : []),
          ...(modelAttributes.checked && isCheckedAttribute(entry)
            ? modelAttributes.checked
            : [attribute(node, entry, scope)]),
        ]),
        ...(restAt === -1 ? [...modelAttributes.rest, ...guard] : []),
        ...modelAttributes.end,
      ]
    },
    each,
    tag: (node, scope) => {
      if (!node.variable) return node.tag
      if (scope.loopTags?.has(node.tag)) {
        return uses("Dynamic", named("@solidjs/web", "Dynamic"))
      }
      return staticTags.get(node.tag) ?? reads(node.tag, node.tag)
    },
    lists: "reactive",
    narrow,
    rewrite,
    slotCode,
    stringSlots,
  })
  const [rootNode] = tree
  const rendered = render(tree, options)
  body.push(...options.hoisted.map(({ line }) => line))
  const providedValue = model.context
  const inlined = new Map(
    providedValue.flatMap(({ code: source }) => {
      const value =
        source === undefined
          ? undefined
          : derived.find(({ name }) => name === source.trim())
      if (!value || !accessors.has(value.name)) return []
      const line = accessorLines.get(value.name)
      const others = [...body.filter((other) => other !== line), rendered]
      return others.some((other) => other.declarations.includes(value.name))
        ? []
        : [
            [
              value.name,
              {
                line,
                parts: narrowed(
                  value.name,
                  value.code,
                  value.reads.names,
                  providerOptions,
                ),
              },
            ],
          ]
    }),
  )
  inlined.forEach(({ line }) => body.splice(body.indexOf(line), 1))
  const getters = (entries) =>
    code`{ ${join(
      entries.map(({ code: source, key, text }) => {
        if (text !== undefined) return text
        const own = inlined.get(source.trim())
        if (own) {
          return code`get ${key}() { ${join([...own.parts.locals, code`return ${own.parts.value}`], "\n")} }`
        }
        const value = rewrite(source, providerOptions)
        return value.code === key && !reactive.has(source)
          ? value
          : code`get ${key}() { return ${value} }`
      }),
      ", ",
    )} }`
  const provided = (content) =>
    uses(
      code`<${provide.context.name}Context value={${getters(providedValue)}}>${content}</${provide.context.name}Context>`,
      named(
        contextModule(provide.context, "solid"),
        `${provide.context.name}Context`,
      ),
    )
  const returned = provide
    ? provided(rootNode.type === "if" ? code`{${rendered}}` : rendered)
    : multiRoot
      ? code`<>${rendered}</>`
      : rootNode.type === "if"
        ? code`<>{${rendered}}</>`
        : rendered
  const resolvedLines = [...resolvedSlots].map((name) =>
    declaration(
      resolvedName(name),
      uses(
        code`const ${resolvedName(name)} = children(() => ${slotRead(name)})`,
        SOLID_JS("children"),
      ),
    ),
  )
  const lines = body.slice(rest ? 1 : 0)
  const underProvider = () => {
    const moved = new Set(resolvedLines.map(({ declares }) => declares))
    const inner = lines.filter((line) => {
      if (!line.declarations.some((name) => moved.has(name))) return false
      if (line.declares !== undefined) moved.add(line.declares)
      return true
    })
    const read = getters(providedValue).declarations.find((name) =>
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
        declaration(
          content,
          code`const ${content} = () => {\n${join([...resolvedLines, ...inner], "\n")}\nreturn (\n${rendered}\n)\n}`,
        ),
      ],
      returned: provided(code`{${call(content)}}`),
    }
  }
  const scoped =
    provide && resolvedLines.length > 0 ? underProvider() : undefined
  const resolvedBody = [
    ...body.slice(0, rest ? 1 : 0),
    ...(scoped ? scoped.body : [...resolvedLines, ...lines]),
  ]
  const resolvedReturn = scoped ? scoped.returned : returned
  const needed = importsOf([...resolvedBody, resolvedReturn])
  const importLines = [
    ...needed.line("@solidjs/web"),
    ...needed.line("solid-js"),
    ...scriptImports(component),
    ...needed.line("../attrs"),
    ...components
      .map((entry) => componentImport(entry, ".solid"))
      .toSorted(byName),
    ...contextLines(component, "solid", needed),
    ...needed.rest(["../cx", "../dev", "../solid"]),
    ...needed.merged(imports, ["../dev", "../cx"]),
    ...needed.line("../solid"),
    propsImport(propsType, "types.solid"),
  ]
  return {
    parts: [...body, returned],
    text: `${SOLID.pragma}${importLines.join("\n")}\n\n${componentFunction(
      component.name,
      "props: Props",
      resolvedBody.map((line) => line.code),
      resolvedReturn.code,
    )}`,
  }
}
