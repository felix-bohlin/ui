import ts from "typescript"
import {
  reactKinds,
  reactPropsOf,
  resolveReactProp,
} from "./example-react-props.mjs"
import {
  chosenSpreadCode,
  componentImport,
  contextLines,
  contextModule,
  contextModules,
  devOnly,
  edgeTrimmed,
  eventRoots,
  hydratingRoots,
  indent,
  isLoose,
  objectCode,
  objectMembers,
  propsImport,
  rewriteFragment,
  rewriteStatementFragment,
  scriptImports,
  styleOption,
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
  needed,
  needsOf,
  reads,
  typed,
  uses,
} from "./component-fragment.ts"
import { bindingFor, isCheckedAttribute } from "./component-models.mjs"
import { emitsTypeOf } from "./component-types.mjs"
import { allValues, scriptValues, valuesIn } from "./component-analysis.mjs"
import {
  byName,
  classMayBeEmpty,
  elementsIn,
  filtersRest,
  isBlank,
  itemBinding,
  onlyClass,
  PRESERVED_TAGS,
  propKey,
  staticClass,
  unsupported,
  withoutClassEntry,
} from "./component-shared.mjs"
import {
  slotInputs,
  sourceText,
  vueAttribute,
  vueBinding,
  vueElement,
  vueFor,
  vueInterpolation,
  vueTemplate,
} from "./print-vue.ts"

const vueSlot = (name) => (name.includes("-") ? `['${name}']` : `.${name}`)

const declaredProp = (name) =>
  name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())

const COMPUTED = named("vue", "computed")

const DEFINED = named("../attrs", "defined")

const HTML_ATTRIBUTES = typed("vue", "HTMLAttributes")

const isMember = (read) =>
  (ts.isPropertyAccessExpression(read.parent) ||
    ts.isElementAccessExpression(read.parent)) &&
  read.parent.expression === read &&
  !read.parent.questionDotToken

const isEntriesArgument = (read) =>
  ts.isCallExpression(read.parent) &&
  read.parent.arguments.length === 1 &&
  read.parent.arguments[0] === read &&
  ts.isPropertyAccessExpression(read.parent.expression) &&
  ts.isIdentifier(read.parent.expression.expression) &&
  read.parent.expression.expression.text === "Object" &&
  read.parent.expression.name.text === "entries"

const binding = (attribute, value, members) => ({
  ...vueBinding(attribute, value),
  attribute,
  members,
  value: asFragment(value),
})

const emptyBindings = (attributes) =>
  attributes.flatMap((entry, at) =>
    entry.attribute === ":class" && classMayBeEmpty(entry.value.code)
      ? [
          {
            at,
            value: uses(
              code`classAttrs(${entry.value})`,
              named("../cx", "classAttrs"),
            ),
          },
        ]
      : entry.attribute === ":style"
        ? [
            {
              at,
              styled: true,
              value: uses(
                code`styleAttrs(${entry.value})`,
                named("../style", "styleAttrs"),
              ),
            },
          ]
        : [],
  )

const omitEmptyAttributes = (attributes, file) => {
  const omitted = emptyBindings(attributes)
  if (omitted.length === 0) return attributes
  const objects = attributes.filter((entry) => entry.attribute === "v-bind")
  if (objects.length > 1) {
    throw unsupported(
      "BC501",
      file,
      `a class list or style that can be empty next to ${objects.length} v-bind objects`,
    )
  }
  const [object] = objects
  const values = omitted.map(({ value }) => value)
  const spreads = join(
    values.map((value) => code`...${value}`),
    ", ",
  )
  const place = object ? attributes.indexOf(object) : omitted[0].at
  const value = !object
    ? values.length === 1
      ? values[0]
      : code`{ ${spreads} }`
    : omitted.some(({ styled }) => styled)
      ? uses(
          code`mergeProps(${join(
            [...omitted, { at: place, value: object.value }]
              .toSorted((a, b) => a.at - b.at)
              .map((entry) => entry.value),
            ", ",
          )})`,
          named("vue", "mergeProps"),
        )
      : code`{ ${
          object.members
            ? fragment(object.members.join(", "), needsOf([object.value]))
            : code`...${object.value}`
        }, ${spreads} }`
  const dropped = new Set(omitted.map(({ at }) => at))
  return attributes
    .map((entry, index) => (index === place ? binding("v-bind", value) : entry))
    .filter((_, index) => index === place || !dropped.has(index))
}

export const toVue = (component) => {
  const {
    components,
    derived,
    imports,
    props,
    propsType,
    provide,
    reads: contextReads,
    rest,
    restOnRoot,
    rootElements,
    slots,
    tree,
    trimmedSlots,
    uid,
    variableTags,
    warnings,
  } = component
  const model = bindingFor(component, "vue")
  const values = allValues(component)
  const used = new Set([
    ...values.flatMap(({ reads: valueReads }) => [...valueReads.names.keys()]),
    ...variableTags,
  ])
  const usedInScript = new Set(
    scriptValues(component).flatMap(({ reads: valueReads }) => [
      ...valueReads.names.keys(),
    ]),
  )
  const attrsOnInner = !restOnRoot
  const { chosenRest, multiRoot } = component
  const allAttrs = multiRoot || chosenRest
  const computedAttrs = attrsOnInner && !allAttrs
  const attributeProps = props.filter(
    ({ local, prop }) => prop.includes("-") && used.has(local),
  )
  const restUsed =
    values.some(
      ({ code: source, reads: valueReads }) =>
        source !== rest && valueReads.rest,
    ) || attributeProps.length > 0
  if (
    attrsOnInner &&
    values.some(({ code: source }) => /\bmergeStyle\(/.test(source))
  ) {
    throw unsupported(
      "BC502",
      component.file,
      `mergeStyle with ${rest} on an inner element`,
    )
  }
  const classProp = props.find(({ prop }) => prop === "class")
  const classInScript = classProp && usedInScript.has(classProp.local)
  const getters = new Set(
    derived
      .filter(({ fn, readsSlot }) => !fn && readsSlot)
      .map(({ name }) => name),
  )
  const providedReader = provide?.value.find(({ readsSlot }) => readsSlot)
  if (providedReader) {
    throw unsupported(
      "BC403",
      component.file,
      `the provided \`${providedReader.key}\`, which reads a slot`,
      "Vue doesn't track slots, so a provided value can't follow one: provide a prop instead",
    )
  }
  const computedConsts = derived.filter(
    ({ fn, name }) => !fn && !getters.has(name),
  )
  const derivedNames = new Set(computedConsts.map(({ name }) => name))
  const events = component.events ?? []
  const listened = eventRoots(component)
  const hydrating = hydratingRoots(component, listened)
  if (events.length > 0 && used.has("emit")) {
    throw unsupported(
      "BC301",
      component.file,
      "the name `emit`, which the Vue port also declares for its events",
      "rename the prop or const in the Astro file",
    )
  }
  const pairedRoot = rootElements.find(
    (node) =>
      !node.component &&
      !node.custom &&
      !node.variable &&
      model.attributes(node, {}).bound !== undefined,
  )
  const explicitAttrs = pairedRoot !== undefined
  const filteredAttrs =
    restOnRoot && attributeProps.length > 0 && !explicitAttrs
  const definedRoot =
    restOnRoot &&
    !explicitAttrs &&
    !filteredAttrs &&
    rootElements.some((node) =>
      node.attributes.some(
        (item) =>
          item.condition === undefined &&
          filtersRest(node, item, component, declaredProp),
      ),
    )
  const componentRoot =
    restOnRoot &&
    !explicitAttrs &&
    !filteredAttrs &&
    !definedRoot &&
    rootElements.some(
      (node) =>
        node.component &&
        node.attributes.some(
          (item) => item.kind === "spread" && item.code === rest,
        ),
    )
  const inheritsAttrs = !(
    attrsOnInner ||
    explicitAttrs ||
    filteredAttrs ||
    definedRoot ||
    componentRoot
  )
  const plainAttrs =
    inheritsAttrs &&
    (allAttrs || explicitAttrs || restUsed || definedRoot || classInScript)
  const untypedAttrs = plainAttrs && !explicitAttrs
  const attrsRead = (text, typedRead) =>
    untypedAttrs && typedRead ? uses(text, HTML_ATTRIBUTES) : text
  const rename = new Map([
    ...props.flatMap(({ local, prop }) =>
      prop === "class"
        ? [[local, "$attrs.class"]]
        : prop === "style"
          ? [[local, "$attrs.style"]]
          : prop.includes("-")
            ? [[local, attrsRead(`attrs['${prop}']`, true)]]
            : [],
    ),
    ...(restUsed ? [[rest, (read) => attrsRead("attrs", isMember(read))]] : []),
    ...trimmedSlots.map(({ local, slot }) => [local, `$slots${vueSlot(slot)}`]),
    ...[...getters].map((name) => [name, reads(`${name}()`, name)]),
    ...model.rename.map(([local, source, template = source]) => [
      local,
      template,
    ]),
  ])
  if (classInScript && !inheritsAttrs) {
    throw unsupported(
      "BC504",
      component.file,
      `\`${classProp.local}\` in the frontmatter of a component that passes its attributes to an inner element`,
      "read it in the template",
    )
  }
  const callerClass = (node, { code: source, reads: classReads }) => {
    if (!classProp || !inheritsAttrs || !rootElements.includes(node)) {
      return source
    }
    const { code: kept, dropped } = withoutClassEntry(source, classProp.local)
    if (!dropped && classReads.names.has(classProp.local)) {
      throw unsupported(
        "BC504",
        component.file,
        `a class list on the root that reads \`${classProp.local}\` without ending in it`,
        `end the list in \`${classProp.local}\``,
      )
    }
    return kept
  }
  const scriptRename = new Map([
    ...rename,
    ...(inheritsAttrs && restUsed
      ? [[rest, (read) => attrsRead("attrs", !isEntriesArgument(read))]]
      : []),
    ...(classInScript
      ? [[classProp.local, attrsRead("attrs.class", true)]]
      : []),
    ...(!inheritsAttrs && restUsed ? [[rest, "attrs.value"]] : []),
    ...(!inheritsAttrs
      ? attributeProps.map(({ local, prop }) => [
          local,
          `attrs.value['${prop}']`,
        ])
      : []),
    ...computedConsts.map(({ name }) => [name, reads(`${name}.value`, name)]),
    ...trimmedSlots.map(({ local, slot }) => [local, `slots${vueSlot(slot)}`]),
    ...model.rename,
  ])
  const declared = new Set(derived.map(({ name }) => name))
  const template = {
    declared,
    rename,
    ids: component.ids,
    slotHas: (name) => `$slots${vueSlot(name)}`,
    style: styleOption(component, "{}"),
  }
  const script = {
    declared,
    rename: scriptRename,
    ids: component.ids,
    slotHas: (name) => `slots${vueSlot(name)}`,
    style: styleOption(component, "{}"),
  }
  const nameIn = (scope, name) => {
    const value = scope.rename.get(name)
    return value === undefined
      ? scope.declared.has(name)
        ? reads(name, name)
        : name
      : value
  }
  const { generic } = model
  const forwarded = (component.baseProps ?? [])
    .filter(
      (key) =>
        key !== "class" &&
        key !== "style" &&
        key !== component.model?.prop &&
        !props.some((entry) => entry.prop === key),
    )
    .toSorted(byName)
  const castsToFalse = (prop) => {
    if (!component.element || component.baseProps?.includes(prop)) return false
    const attributes = reactPropsOf(component.element, false) ?? new Map()
    return reactKinds(
      attributes,
      resolveReactProp(attributes, prop) ?? prop,
    ).has("boolean")
  }
  const declaredProps = [
    ...forwarded.map((key) => ({ prop: key, text: key })),
    ...props
      .filter(
        ({ local, prop }) =>
          prop !== "class" &&
          prop !== "style" &&
          !prop.includes("-") &&
          !model.props.dropped.includes(prop) &&
          (used.has(local) ||
            prop === component.model?.prop ||
            model.props.added.includes(prop)),
      )
      .map(({ default: fallback, local, prop }) => ({
        prop,
        text: `${local === prop ? prop : `${propKey(prop)}: ${local}`}${
          fallback
            ? ` = ${fallback}`
            : model.props.unset.includes(prop) || castsToFalse(prop)
              ? " = undefined"
              : ""
        }`,
      })),
  ]
    .toSorted((a, b) => byName(a.prop, b.prop))
    .map(({ text }) => text)
  const slotsInScript = scriptValues(component).some(
    ({ reads: valueReads }) => valueReads.slots.length > 0,
  )
  const rewrite = (source, scope) => rewriteFragment(source, scope)
  const filteredSpread = (node, item, spread) =>
    filtersRest(node, item, component, declaredProp)
      ? uses(code`defined(${spread})`, DEFINED)
      : spread
  const definedSpread = (item, spread) =>
    item.defined === true ? uses(code`defined(${spread})`, DEFINED) : spread
  const attribute = (node, item, scope) => {
    if (item.kind === "class") {
      const source = callerClass(node, item)
      if (source === undefined) return []
      const text = source === item.code ? undefined : staticClass(source)
      return [
        text === undefined
          ? binding(":class", rewrite(onlyClass(source) ?? source, scope))
          : vueAttribute({ kind: "static", name: "class", value: text }),
      ]
    }
    if (item.kind === "spread") {
      if (item.code === rest && item.condition !== undefined) {
        return [
          binding(
            "v-bind",
            filteredSpread(
              node,
              item,
              chosenSpreadCode(item, "attrs", rewrite(item.condition, scope)),
            ),
          ),
        ]
      }
      if (item.code === rest) {
        const forwardedProps = forwarded.map((key) => binding(`:${key}`, key))
        const object =
          rootElements.includes(node) && !explicitAttrs
            ? filteredAttrs
              ? "restAttrs"
              : definedRoot
                ? "attrs"
                : componentRoot && node.component
                  ? "attrs"
                  : undefined
            : "attrs"
        return [
          ...(object
            ? [binding("v-bind", filteredSpread(node, item, object))]
            : []),
          ...forwardedProps,
        ]
      }
      return [binding("v-bind", definedSpread(item, rewrite(item.code, scope)))]
    }
    if (item.kind === "static" || item.kind === "boolean") {
      return [
        vueAttribute(item, undefined, { slotted: scope.slotted?.has(node) }),
      ]
    }
    if (rootElements.includes(node) && inheritsAttrs && item.reads.rest) {
      throw unsupported(
        "BC503",
        component.file,
        `the attribute \`${item.name}\` on the root element, which reads \`${rest}\``,
        "Vue merges the attributes that fall through after it, so the caller's value wins: destructure the prop in the Astro file",
      )
    }
    return [binding(`:${item.name}`, rewrite(item.code, scope))]
  }
  const directive = (nodes, name, test, scope) => {
    const significant = nodes.filter((node) => !isBlank(node))
    const clause = test === undefined ? name : vueBinding(name, test)
    if (significant.length === 1 && significant[0].type !== "if") {
      return emitOne(significant[0], clause, scope)
    }
    return vueTemplate(clause, body(nodes, scope))
  }
  const emitOne = (node, clause, scope) => {
    if (node.type === "text") return sourceText(node)
    if (node.type === "expression") {
      const value = vueInterpolation(rewrite(node.code, scope))
      return clause ? vueTemplate(clause, value) : value
    }
    if (node.type === "slot") {
      const slotClause = clause ? code` ${clause}` : ""
      if (node.trimmed) {
        return uses(
          code`<TrimmedSlot${slotClause} ${vueBinding(":nodes", `$slots${vueSlot(node.name)}?.()`)} />`,
          named("../whitespace.vue", "TrimmedSlot"),
        )
      }
      const name = node.name === "default" ? "" : ` name="${node.name}"`
      if (node.fallback.length === 0) {
        return code`<slot${slotClause}${name}></slot>`
      }
      const pair = code`<slot ${vueBinding("v-if", `$slots${vueSlot(node.name)}`)}${name}></slot>\n${directive(node.fallback, "v-else", undefined, scope)}`
      return clause ? vueTemplate(clause, pair) : pair
    }
    if (node.type === "if") {
      const test = rewrite(node.test, scope)
      const consequent = directive(node.consequent, "v-if", test, scope)
      if (!node.alternate) return consequent
      return code`${consequent}\n${directive(node.alternate, "v-else", undefined, scope)}`
    }
    if (node.type === "each") {
      const rows = rowsOf(node, scope)
      const declares = new Set([...(scope.declares ?? []), ...node.declares])
      const inner = rows
        ? { ...scope, declares }
        : {
            ...scope,
            declares,
            rename: new Map([
              ...scope.rename,
              ...node.consts.map(({ code: source, name }) => [
                name,
                rewrite(source, scope),
              ]),
            ]),
          }
      const root = node.children.find((child) => !isBlank(child))
      const loop = vueFor({
        index: node.index,
        item: rows?.item ?? node.item,
        key: node.key,
        list: rows ? rows.name : rewrite(node.list, scope),
      })
      return emitOne(root, loop, inner)
    }
    const modelAttributes = model.attributes(node, {
      rewrite: (source) => rewrite(source, scope),
    })
    const ownChecked = modelAttributes.checked
      ? node.attributes.find(isCheckedAttribute)
      : undefined
    const ownAttributes = node.attributes.filter((item) => item !== ownChecked)
    const spreads = ownAttributes.filter(
      (item) =>
        item.kind === "spread" &&
        !(
          item.code === rest &&
          item.condition === undefined &&
          rootElements.includes(node) &&
          !definedRoot
        ),
    )
    const first = ownAttributes.indexOf(spreads[0])
    const last = ownAttributes.indexOf(spreads.at(-1))
    const merged = (item) => {
      if (item.kind === "spread") {
        return {
          spread:
            item.code === rest
              ? filteredSpread(
                  node,
                  item,
                  item.condition === undefined
                    ? "attrs"
                    : chosenSpreadCode(
                        item,
                        "attrs",
                        rewrite(item.condition, scope),
                      ),
                )
              : definedSpread(item, rewrite(item.code, scope)),
        }
      }
      if (item.kind === "static") {
        return {
          code: rewrite(JSON.stringify(item.value), scope),
          key: item.name,
        }
      }
      if (item.kind === "boolean") return { code: "true", key: item.name }
      if (item.kind === "expression") {
        return { code: rewrite(item.code, scope), key: item.name }
      }
      throw unsupported(
        "BC501",
        component.file,
        `a class list between two spreads on <${node.tag}>`,
      )
    }
    const objectBinding = (entries) => {
      const printable = entries.map((entry) =>
        entry.spread === undefined
          ? { code: asFragment(entry.code).code, key: entry.key }
          : { spread: asFragment(entry.spread).code },
      )
      const options = { shorthand: false }
      return binding(
        "v-bind",
        fragment(
          objectCode(printable, options),
          needsOf(entries.map((entry) => entry.spread ?? entry.code)),
        ),
        objectMembers(printable, options),
      )
    }
    const bound =
      spreads.length > 1
        ? [
            ...ownAttributes.slice(0, first),
            {
              kind: "bound",
              text: objectBinding(
                ownAttributes.slice(first, last + 1).map(merged),
              ),
            },
            ...ownAttributes.slice(last + 1),
          ]
        : ownAttributes
    const bindScope = modelAttributes.rename.length
      ? {
          ...scope,
          rename: new Map([...scope.rename, ...modelAttributes.rename]),
        }
      : scope
    const own = ownChecked && {
      code: rewrite(ownChecked.code, bindScope),
      name: "checked",
    }
    const withOwn = (listed, entry) => {
      if (entry === undefined) return listed
      const ownSpread = uses(
        code`defined({ ${entry.name === entry.code.code ? entry.name : code`${entry.name}: ${entry.code}`} })`,
        DEFINED,
      )
      const at = listed.findIndex((item) => item.attribute === "v-bind")
      if (at === -1) return [...listed, binding("v-bind", ownSpread)]
      const { value } = listed[at]
      return listed.map((item, index) =>
        index === at
          ? binding("v-bind", code`{ ...${ownSpread}, ...${value} }`, [
              `...${ownSpread.code}`,
              `...${value.code}`,
            ])
          : item,
      )
    }
    const restAt = bound.findIndex(
      (entry) => entry.kind === "spread" && entry.code === rest,
    )
    const listedFor = (opening, extra, checked) =>
      withOwn(
        [
          ...(opening ? [opening] : []),
          ...bound.flatMap((entry, index) => [
            ...(index === restAt ? modelAttributes.rest : []),
            ...(entry.kind === "bound"
              ? [entry.text]
              : attribute(node, entry, bindScope)),
          ]),
          ...(restAt === -1 ? modelAttributes.rest : []),
          ...extra,
          ...modelAttributes.end,
          ...(listened.includes(node)
            ? events.map((event) =>
                vueBinding(`@${event}`, `emit('${event}', $event)`),
              )
            : []),
          ...(hydrating.has(node)
            ? [
                hydrating.get(node)
                  ? vueBinding(
                      ":data-hydrating",
                      code`${nameIn(scope, hydrating.get(node))}.includes('-') ? '' : undefined`,
                    )
                  : 'data-hydrating=""',
                uses("v-hydrated", named("../vue", "vHydrated")),
              ]
            : []),
          ...((rootElements.includes(node) ||
            (multiRoot &&
              node.attributes.some(
                (entry) => entry.kind === "spread" && entry.code === rest,
              ))) &&
          !inheritsAttrs &&
          !node.attributes.some((entry) => entry.kind === "class")
            ? [binding(":class", "$attrs.class")]
            : []),
        ]
          .map(asFragment)
          .filter((entry) => entry.code !== ""),
        checked,
      )
    const render = (listed) =>
      vueElement(node, {
        attributes: join(omitEmptyAttributes(listed, component.file), " "),
        content: body(node.children, {
          ...scope,
          preserved: scope.preserved || PRESERVED_TAGS.has(node.tag),
          slotted: node.component ? slotInputs(node.children) : undefined,
        }),
        emptyElements: "foreign",
        is: node.variable ? nameIn(scope, node.tag) : undefined,
      })
    const pair = modelAttributes.bound
    if (!pair) return render(listedFor(clause, []))
    const both = code`${render(
      listedFor(vueBinding("v-if", pair.condition), pair.attributes),
    )}\n${render(listedFor("v-else", [], own))}`
    return clause ? vueTemplate(clause, both) : both
  }
  const emit = (nodes, scope) =>
    join(
      nodes.map((node, index) =>
        emitOne(node, undefined, {
          ...scope,
          hugged: [nodes[index - 1], nodes[index + 1]].some(
            (sibling) => sibling && !isLoose(sibling),
          ),
        }),
      ),
    )
  const rowLists = []
  const rowsOf = (node, scope) => {
    const loopValues = [...node.consts, ...valuesIn(node.children)]
    const tags = elementsIn(node.children)
      .filter((element) => element.variable)
      .map((element) => element.tag)
    const readsOf = (name) =>
      loopValues.reduce(
        (total, value) => total + (value.reads.names.get(name) ?? 0),
        tags.filter((tag) => tag === name).length,
      )
    if (!node.consts.some(({ name }) => readsOf(name) > 1)) return undefined
    const inTemplate = [node, ...node.consts].some(
      (value) =>
        value.readsSlot ||
        value.reads.loop.some((name) => scope.declares?.has(name)),
    )
    if (inTemplate) return undefined
    const binding = itemBinding(node.item)
    if (!binding) {
      throw unsupported(
        "BC203",
        component.file,
        `the loop item \`${node.item}\`, whose consts the Vue port computes once per row`,
        "take the item as one name, or as an object pattern of plain names",
      )
    }
    const declares = new Set([
      ...(binding.name ? [binding.name] : []),
      ...binding.fields.map(({ local }) => local),
      ...(binding.rest ? [binding.rest] : []),
      ...node.consts.map(({ name }) => name),
      node.index,
    ])
    const free = (bases) => {
      const found = bases.find((base) => !used.has(base) && !declares.has(base))
      if (!found) {
        throw unsupported(
          "BC301",
          component.file,
          `the names ${bases.join(", ")}`,
          "rename one: the Vue port declares it for the rows of a loop",
        )
      }
      return found
    }
    const name = free([
      "rows",
      ...(/^[A-Za-z_$][\w$]*$/.test(node.list.trim())
        ? [`${node.list.trim()}Rows`]
        : []),
      `rows${rowLists.length + 1}`,
    ])
    used.add(name)
    const key = free(["item", "entry", "row"])
    const readInConsts = (local) =>
      node.consts.some(({ reads: constReads }) => constReads.names.has(local))
    const fields = binding.fields.filter(({ local }) => readInConsts(local))
    const pattern = binding.name
      ? undefined
      : binding.rest && readInConsts(binding.rest)
        ? node.item
        : fields.length
          ? `{ ${fields.map(({ key: field, local }) => (field === local ? local : `${field}: ${local}`)).join(", ")} }`
          : undefined
    const parameter = binding.name ?? key
    const rowScope = {
      ...script,
      declared: new Set([...declared].filter((local) => !declares.has(local))),
      rename: new Map(
        [...script.rename].filter(([local]) => !declares.has(local)),
      ),
    }
    const usesIndex = node.consts.some(({ reads: constReads }) =>
      constReads.names.has(node.index),
    )
    const entries = [
      ...node.consts.map(({ name: local }) => local),
      binding.name && binding.name !== key ? `${key}: ${binding.name}` : key,
    ].toSorted(byName)
    rowLists.push(
      declaration(
        name,
        uses(
          code`const ${name} = computed(() =>\n  ${rewrite(node.list, script)}${node.optional ? "?." : "."}map((${parameter}${usesIndex ? `, ${node.index}` : ""}) => {\n${join(
            [
              ...(pattern ? [`const ${pattern} = ${parameter}`] : []),
              ...node.consts.map(
                ({ code: source, name: local }) =>
                  code`const ${local} = ${rewrite(source, rowScope)}`,
              ),
              `return { ${entries.join(", ")} }`,
            ].map((line) => code`    ${line}\n`),
          )}  }),\n)`,
          COMPUTED,
        ),
      ),
    )
    return {
      item: `{ ${[
        ...node.consts.map(({ name: local }) => local),
        `${key}: ${node.item}`,
      ]
        .toSorted(byName)
        .join(", ")} }`,
      name,
    }
  }
  const body = (nodes, scope) => {
    const inner =
      scope.preserved || scope.hugged
        ? undefined
        : edgeTrimmed(nodes, { interpolated: false })
    return inner ? code`\n${emit(inner, scope)}\n` : emit(nodes, scope)
  }
  const markup = emit(tree, template)
  const slotsType =
    propsType !== "Props" &&
    (component.folderSlots || slots.some((slot) => slot !== "default"))
      ? `${component.name}Slots`
      : "Slots"
  const emitsType = emitsTypeOf(propsType)
  const provided = provide
    ? model.context.map(
        ({ code: source, key, text }) =>
          text ??
          (derivedNames.has(source)
            ? reads(source === key ? key : `${key}: ${source}`, source)
            : uses(
                code`${key}: computed(() => ${arrowBody(rewrite(source, script))})`,
                COMPUTED,
              )),
      )
    : undefined
  const vueProps = generic ? `Props & ${generic.props}` : "Props"
  const propsLine = `${generic ? `${generic.type}\n\n` : ""}${
    declaredProps.length
      ? `const { ${declaredProps.join(", ")} } = defineProps<${vueProps}>()`
      : `defineProps<${vueProps}>()`
  }`
  const slotsLine = slotsInScript
    ? `const slots = defineSlots<${slotsType}>()`
    : `defineSlots<${slotsType}>()`
  const declarations = derived.map(({ code: source, fn, name }) =>
    declaration(
      name,
      fn
        ? code`const ${name} = ${rewrite(source, script)}`
        : getters.has(name)
          ? code`const ${name} = () => ${arrowBody(rewrite(source, script))}`
          : uses(
              code`const ${name} = computed(() => ${arrowBody(rewrite(source, script))})`,
              COMPUTED,
            ),
    ),
  )
  const modelScript = model.script((source) => rewrite(source, script))
  const statements = [
    ...(filteredAttrs
      ? [
          uses(
            `const restAttrs = computed(() => {\n  const { ${attributeProps.map(({ local, prop }) => `${JSON.stringify(prop)}: _${local}, `).join("")}...rest } = attrs.value\n  return rest\n})`,
            COMPUTED,
          ),
        ]
      : []),
    ...modelScript.before,
    ...contextReads.map(({ context, name }) =>
      uses(
        `const ${name} = inject(${context.name}Key, undefined)`,
        named("vue", "inject"),
        named(contextModule(context, "vue"), `${context.name}Key`),
      ),
    ),
    ...(uid ? [uses("const uid = useId()", named("vue", "useId"))] : []),
    ...declarations,
    ...rowLists,
    ...warnings.map(({ code: source }) =>
      devOnly(rewriteStatementFragment(source, script)),
    ),
    ...modelScript.after,
    ...(provide
      ? [
          uses(
            code`provide(${provide.context.name}Key, reactive({ ${join(provided, ", ")} }))`,
            named("vue", "provide"),
            named("vue", "reactive"),
            named(
              contextModule(provide.context, "vue"),
              `${provide.context.name}Key`,
            ),
          ),
        ]
      : []),
  ].map(asFragment)
  const kept = new Set(
    needed(
      [markup, ...statements.filter((line) => !declarations.includes(line))],
      declarations,
    ),
  )
  const keptStatements = statements.filter(
    (line) => !declarations.includes(line) || kept.has(line),
  )
  const attrsLine = computedAttrs
    ? uses("const attrs = useInputAttrs()", named("../vue", "useInputAttrs"))
    : explicitAttrs
      ? uses(
          `const attrs = useRestAttrs<IntrinsicElementAttributes[${JSON.stringify(pairedRoot.tag)}]>()`,
          named("../vue", "useRestAttrs"),
          typed("vue", "IntrinsicElementAttributes"),
        )
      : !inheritsAttrs
        ? uses("const attrs = useRestAttrs()", named("../vue", "useRestAttrs"))
        : plainAttrs
          ? importsOf([markup, ...keptStatements]).has(
              HTML_ATTRIBUTES.module,
              HTML_ATTRIBUTES.name,
            )
            ? uses(
                "const attrs = useAttrs() as HTMLAttributes",
                named("vue", "useAttrs"),
                HTML_ATTRIBUTES,
              )
            : uses("const attrs = useAttrs()", named("vue", "useAttrs"))
          : undefined
  const setupLines = [...(attrsLine ? [attrsLine] : []), ...keptStatements]
  const imported = importsOf([markup, ...setupLines])
  const importLines = [
    ...scriptImports(component),
    ...imported.line("vue", { typeOnly: false }),
    ...imported.line("../vue"),
    ...imported.line("../whitespace.vue"),
    ...imported.rest([
      "../attrs",
      "../cx",
      "../dev",
      "../style",
      ...contextModules(component, "vue"),
    ]),
    ...components
      .map((entry) => componentImport(entry, ".vue"))
      .toSorted(byName),
    ...contextLines(component, "vue", imported),
    ...imported.merged(imports, ["../attrs", "../dev", "../cx", "../style"]),
    propsImport(propsType, "types.vue-props", [
      ...(events.length ? [emitsType] : []),
      ...(slots.length ? [slotsType] : []),
    ]),
  ]
  const setup = [
    importLines.join("\n"),
    [
      propsLine,
      ...(slots.length ? [slotsLine] : []),
      ...(events.length ? [`const emit = defineEmits<${emitsType}>()`] : []),
    ].join("\n"),
    ...(inheritsAttrs ? [] : ["defineOptions({\n  inheritAttrs: false,\n})"]),
    ...setupLines.map((line) => line.code),
  ]
  return `<script setup lang="ts"${generic ? ` generic="${generic.parameter}"` : ""}>\n${setup.join("\n\n")}\n</script>\n\n<template>\n${indent(markup.code, 2)}\n</template>\n`
}
