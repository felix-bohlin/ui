import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { MODEL_KINDS } from "./component-models.mjs"
import {
  REACT_ATTRIBUTE_NAMES,
  propsOf,
  reactAttributeName,
} from "./example-react-props.mjs"
import {
  byName,
  containsKind,
  propKey,
  root,
  sourceFileOf,
  unsupported,
} from "./component-shared.mjs"

const ELEMENT_TYPES = {
  react: (element) => `ComponentProps<${element}>`,
  solid: (element) => `ComponentProps<${element}>`,
  svelte: (element) => `SvelteHTMLElements[${element}]`,
  vue: (element) => `IntrinsicElementAttributes[${element}]`,
}

const LINK_TYPES = {
  react: "ComponentType<any>",
  solid: "Component<any>",
  vue: "Component",
}

const isReference = (node, name) =>
  ts.isTypeReferenceNode(node) && node.typeName.getText() === name

const elementRef = (node) =>
  isReference(node, "HTMLAttributes") &&
  node.typeArguments?.length === 1 &&
  ts.isLiteralTypeNode(node.typeArguments[0]) &&
  ts.isStringLiteral(node.typeArguments[0].literal)
    ? node
    : undefined

const literalKeys = (node) =>
  ts.isUnionTypeNode(node)
    ? node.types.flatMap(literalKeys)
    : ts.isParenthesizedTypeNode(node)
      ? literalKeys(node.type)
      : ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)
        ? [node.literal.text]
        : []

const otherKeys = (node) =>
  ts.isUnionTypeNode(node)
    ? node.types.flatMap(otherKeys)
    : ts.isParenthesizedTypeNode(node)
      ? otherKeys(node.type)
      : ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)
        ? []
        : [node.getText()]

const elementRefs = (node) => {
  const refs = []
  const visit = (child) => {
    if (
      isReference(child, "Omit") &&
      child.typeArguments?.length === 2 &&
      elementRef(child.typeArguments[0])
    ) {
      refs.push({
        element: child.typeArguments[0].typeArguments[0].literal.getText(),
        keys: literalKeys(child.typeArguments[1]),
        node: child,
        omittable: true,
        others: otherKeys(child.typeArguments[1]),
      })
      return
    }
    const ref = elementRef(child)
    if (ref) {
      refs.push({
        element: ref.typeArguments[0].literal.getText(),
        keys: [],
        node: ref,
        omittable:
          !ts.isTypeReferenceNode(ref.parent) &&
          !ts.isIndexedAccessTypeNode(ref.parent),
      })
      return
    }
    ts.forEachChild(child, visit)
  }
  visit(node)
  return refs
}

const elementsOf = (node) => [
  ...new Set(elementRefs(node).map(({ element }) => JSON.parse(element))),
]

const hasElement = (node) => elementRefs(node).length > 0

const joinedElements = (node) => {
  if (ts.isIntersectionTypeNode(node)) {
    const elements = [
      ...new Set(
        node.types.filter((part) => !isUnion(part)).flatMap(elementsOf),
      ),
    ]
    if (elements.length > 1) return elements
  }
  let found
  ts.forEachChild(node, (child) => {
    found ??= joinedElements(child)
  })
  return found
}

const baseRef = (node, name) =>
  ts.isTypeReferenceNode(node) &&
  ts.isQualifiedName(node.typeName) &&
  node.typeName.left.getText() === "Base" &&
  node.typeName.right.text === name

const omitsBase = (node, name) =>
  isReference(node, "Omit") &&
  node.typeArguments?.length === 2 &&
  baseRef(node.typeArguments[0], name) &&
  otherKeys(node.typeArguments[1]).length === 0

const members = (node) =>
  ts.isIntersectionTypeNode(node)
    ? node.types
    : ts.isParenthesizedTypeNode(node)
      ? members(node.type)
      : [node]

const declaresProperty = (node, name) =>
  containsKind(
    node,
    (child) => ts.isPropertySignature(child) && child.name.getText() === name,
  )

const spliced = (text, edits) =>
  edits
    .toSorted((a, b) => b.start - a.start)
    .reduce(
      (out, { end, start, text: replacement }) =>
        `${out.slice(0, start)}${replacement}${out.slice(end)}`,
      text,
    )

const replacing = (node, text) => ({
  end: node.end,
  start: node.getStart(),
  text,
})

const appending = (node, text) => ({ end: node.end, start: node.end, text })

const frameworkKey = (framework, element, key) =>
  framework === "react" ? reactAttributeName(JSON.parse(element), key) : key

const declaredAttributes = (element, keys) => {
  const attributes = propsOf("solid", JSON.parse(element), false)
  return attributes ? keys.filter((key) => attributes.has(key)) : []
}

const omitted = (framework, element, keys, others = []) =>
  keys.length || others.length
    ? `Omit<${ELEMENT_TYPES[framework](element)}, ${[
        ...[
          ...new Set(keys.map((key) => frameworkKey(framework, element, key))),
        ]
          .map((key) => JSON.stringify(key))
          .toSorted(),
        ...others,
      ].join(" | ")}>`
    : ELEMENT_TYPES[framework](element)

const typeAliases = (source) =>
  source.statements.filter(ts.isTypeAliasDeclaration).map((statement) => ({
    name: statement.name.text,
    node: statement,
    text: statement.getText(),
    typeParameters: statement.typeParameters?.length ?? 0,
  }))

const objectKeys = (node) =>
  ts.isTypeLiteralNode(node)
    ? node.members.map((member) => member.name.getText())
    : ts.isIntersectionTypeNode(node)
      ? node.types.flatMap(objectKeys)
      : ts.isParenthesizedTypeNode(node)
        ? objectKeys(node.type)
        : []

const isUnion = (node) =>
  ts.isUnionTypeNode(node) ||
  (ts.isParenthesizedTypeNode(node) && isUnion(node.type)) ||
  (ts.isIntersectionTypeNode(node) && node.types.some(isUnion))

const typeKeys = (node, aliases) =>
  ts.isIntersectionTypeNode(node)
    ? node.types.flatMap((type) => typeKeys(type, aliases))
    : ts.isUnionTypeNode(node)
      ? node.types
          .map((type) => typeKeys(type, aliases))
          .reduce((shared, keys) => shared.filter((key) => keys.includes(key)))
      : ts.isParenthesizedTypeNode(node)
        ? typeKeys(node.type, aliases)
        : ts.isTypeReferenceNode(node) &&
            aliases.some((alias) => alias.name.text === node.typeName.getText())
          ? typeKeys(
              aliases.find(
                (alias) => alias.name.text === node.typeName.getText(),
              ).type,
              aliases,
            )
          : objectKeys(node)

const requiredKey = (node, key, aliases) => {
  let required = false
  const visit = (child) => {
    if (
      ts.isPropertySignature(child) &&
      child.name.getText().replace(/^["']|["']$/g, "") === key
    ) {
      required ||= !child.questionToken
      return
    }
    if (
      ts.isTypeReferenceNode(child) &&
      aliases.some((alias) => alias.name.text === child.typeName.getText())
    ) {
      visit(
        aliases.find((alias) => alias.name.text === child.typeName.getText())
          .type,
      )
      return
    }
    ts.forEachChild(child, visit)
  }
  visit(node)
  return required
}

const attributeKeys = (node, aliases) => {
  const keys = new Set()
  const visit = (child) => {
    if (
      ts.isPropertySignature(child) &&
      ts.isStringLiteral(child.name) &&
      child.name.text.includes("-")
    ) {
      keys.add(child.name.text)
    }
    if (ts.isTypeReferenceNode(child)) {
      const alias = aliases.find(
        (entry) => entry.name.text === child.typeName.getText(),
      )
      if (alias) visit(alias.type)
    }
    ts.forEachChild(child, visit)
  }
  visit(node)
  return [...keys].toSorted()
}

const mentions = (node, parameter) =>
  containsKind(node, (child) => isReference(child, parameter))

const isStringTyped = (node) =>
  containsKind(node, (child) => child.kind === ts.SyntaxKind.StringKeyword)

const slotMembers = (node, parameter) =>
  ts.isTypeLiteralNode(node)
    ? node.members
        .filter(
          (member) =>
            ts.isPropertySignature(member) &&
            member.type &&
            mentions(member.type, parameter),
        )
        .map((member) => ({
          name: member.name.getText(),
          string: isStringTyped(member.type),
        }))
    : ts.isUnionTypeNode(node) ||
        ts.isIntersectionTypeNode(node) ||
        ts.isParenthesizedTypeNode(node)
      ? [
          ...new Map(
            (node.types ?? [node.type])
              .flatMap((type) => slotMembers(type, parameter))
              .map((member) => [member.name, member]),
          ).values(),
        ]
      : []

export const eventProp = (framework, event) =>
  framework === "react" || framework === "solid"
    ? `on${event[0].toUpperCase()}${event.slice(1)}`
    : `on${event}`

export const eventsTypeOf = (name) =>
  name === "Props" ? "Events" : name.replace(/Props$/, "Events")

export const emitsTypeOf = (name) =>
  name === "Props" ? "Emits" : name.replace(/Props$/, "Emits")

const eventNames = (alias, file) => {
  if (!ts.isTypeLiteralNode(alias.type)) {
    throw unsupported(
      "BC603",
      file,
      `the type ${alias.name.text}, which isn't an object type`,
      "list each event the root element fires with the type of its event object: `{ dismiss: Event }`",
    )
  }
  return alias.type.members.map((member) => {
    const name = member.name?.getText() ?? ""
    if (
      !ts.isPropertySignature(member) ||
      !member.type ||
      member.questionToken ||
      !/^[a-z]+$/.test(name)
    ) {
      throw unsupported(
        "BC603",
        file,
        `the event ${name || member.getText()} in ${alias.name.text}`,
        "name each event the root element fires in lowercase letters, with the type of its event object: `dismiss: Event`",
      )
    }
    return name
  })
}

export const eventsOf = (base, name, folder) => {
  if (!base) return []
  const alias = sourceFileOf(base, "types.ts")
    .statements.filter(ts.isTypeAliasDeclaration)
    .find(
      (statement) =>
        statement.name.text ===
        eventsTypeOf(name === folder ? "Props" : `${name}Props`),
    )
  return alias
    ? eventNames(alias, `packages/opui/components/${folder}/types.ts`)
    : []
}

export const toTypes = (
  folder,
  { astro, base },
  slotsByComponent,
  propsByComponent = {},
  rootsByComponent = {},
  modelsByComponent = {},
) => {
  const file = `packages/opui/components/${folder}/types.astro.ts`
  const source = sourceFileOf(astro, "types.astro.ts")
  const baseImport = source.statements.find(
    (statement) =>
      ts.isImportDeclaration(statement) &&
      statement.moduleSpecifier.text === "./types" &&
      statement.importClause?.namedBindings &&
      ts.isNamespaceImport(statement.importClause.namedBindings) &&
      statement.importClause.namedBindings.name.text === "Base",
  )
  if (!baseImport) {
    throw unsupported("BC601", file, "a types.astro.ts without the Base import")
  }
  const elementImport = source.statements.find(
    (statement) =>
      ts.isImportDeclaration(statement) &&
      statement.moduleSpecifier.text === "astro/types",
  )
  const baseFile = sourceFileOf(base, "types.ts")
  const baseAliases = baseFile.statements.filter(ts.isTypeAliasDeclaration)
  const slotTypes = new Map(
    baseAliases
      .filter(({ name }) => name.text.endsWith("Slots"))
      .map((alias) => [alias.name.text, alias]),
  )
  const linked = new Set(
    baseAliases
      .filter((alias) =>
        alias.typeParameters?.some(
          (parameter) => parameter.name.text === "Link",
        ),
      )
      .map((alias) => alias.name.text),
  )
  for (const alias of baseAliases) {
    const parameter = alias.typeParameters?.find(
      (entry) => entry.name.text === "Link",
    )
    if (parameter && parameter.default?.kind !== ts.SyntaxKind.NeverKeyword) {
      throw unsupported(
        "BC607",
        `packages/opui/components/${folder}/types.ts`,
        `the type parameter Link of ${alias.name.text} without the default never`,
        "write `Link = never`: Astro and Svelte take element names only, and React, Solid and Vue pass their link component type",
      )
    }
  }
  const linksBase = (node) =>
    containsKind(
      node,
      (child) =>
        ts.isQualifiedName(child) &&
        child.left.getText() === "Base" &&
        linked.has(child.right.text),
    )
  const takesLink = (node) =>
    ts.isPropertySignature(node) &&
    node.name.getText() === "as" &&
    !!node.type &&
    literalKeys(node.type).includes("a")
  const slotsTypeOf = (name) =>
    name === "Props" ? "Slots" : name.replace(/Props$/, "Slots")
  const componentOf = (name) =>
    name === "Props" ? folder : name.replace(/Props$/, "")
  const aliases = typeAliases(source)
  for (const alias of aliases) {
    if (!hasElement(alias.node.type)) {
      throw unsupported("BC602", file, `the type ${alias.name}`)
    }
    const joined = joinedElements(alias.node.type)
    if (joined) {
      throw unsupported(
        "BC608",
        file,
        `the type ${alias.name}, which joins the attributes of ${joined.join(" and ")} with &`,
        "write a union with one element per member, as Button does",
      )
    }
  }
  const propsAliases = aliases.filter(({ name }) => name.endsWith("Props"))
  const baseFileName = `packages/opui/components/${folder}/types.ts`
  const eventTypes = new Map(
    baseAliases
      .filter(({ name }) => name.text.endsWith("Events"))
      .map((alias) => [alias.name.text, alias]),
  )
  for (const eventsName of eventTypes.keys()) {
    if (!propsAliases.some(({ name }) => eventsTypeOf(name) === eventsName)) {
      throw unsupported(
        "BC603",
        baseFileName,
        `the type ${eventsName}, which names no props type in types.astro.ts`,
        "name it after the props it belongs to: Events for Props, <Root><Part>Events for <Root><Part>Props",
      )
    }
  }
  const eventsFor = (name) =>
    eventTypes.has(eventsTypeOf(name))
      ? eventNames(eventTypes.get(eventsTypeOf(name)), baseFileName)
      : []
  const slotted = propsAliases.filter(({ name }) =>
    slotTypes.has(slotsTypeOf(name)),
  )
  const slotKeysOf = (slotsAlias) =>
    slotMembers(
      slotsAlias.type,
      slotsAlias.typeParameters?.[0]?.name.text ?? "S",
    )
  for (const { name } of slotted) {
    const slotsAlias = slotTypes.get(slotsTypeOf(name))
    const propsAlias = baseAliases.find((alias) => alias.name.text === name)
    const slotKeys = slotKeysOf(slotsAlias).map((member) => member.name)
    if (slotKeys.length === 0) {
      throw unsupported(
        "BC604",
        file,
        `the type ${slotsTypeOf(name)}, which names no slot`,
      )
    }
    const overlap = slotKeysOf(slotsAlias)
      .filter((member) => !member.string)
      .map((member) => member.name)
      .filter((key) =>
        (propsAlias ? typeKeys(propsAlias.type, baseAliases) : []).includes(
          key,
        ),
      )
    if (overlap.length > 0) {
      throw unsupported(
        "BC604",
        file,
        `a prop and a slot both named ${overlap.join(", ")}`,
      )
    }
    const astroSlots = slotsByComponent[componentOf(name)] ?? []
    const pureSlots = slotKeysOf(slotsAlias)
      .filter((member) => !member.string)
      .map((member) => member.name)
      .filter((key) => !astroSlots.some((slot) => slotProp(slot) === key))
    if (pureSlots.some((key) => /[A-Z]/.test(key))) {
      throw unsupported(
        "BC604",
        file,
        `the slot ${pureSlots.find((key) => /[A-Z]/.test(key))}, whose Vue name is kebab-case`,
      )
    }
  }
  const customRoot = (name) => {
    const roots = rootsByComponent[componentOf(name)] ?? []
    return roots.length === 1 && roots[0].includes("-") ? roots[0] : undefined
  }
  const stringSlotKeys = (name) =>
    slotTypes.has(slotsTypeOf(name))
      ? slotKeysOf(slotTypes.get(slotsTypeOf(name)))
          .filter((member) => member.string)
          .map((member) => member.name)
          .toSorted(byName)
      : []
  const reactRenamed = (name) => {
    const baseAlias = baseAliases.find((entry) => entry.name.text === name)
    return (baseAlias ? typeKeys(baseAlias.type, baseAliases) : [])
      .filter((key) => key !== "class" && REACT_ATTRIBUTE_NAMES[key])
      .toSorted(byName)
  }
  const baseKeys = (name) => {
    const baseAlias = baseAliases.find((entry) => entry.name.text === name)
    return baseAlias ? typeKeys(baseAlias.type, baseAliases) : []
  }
  const withoutHelper = (framework) =>
    propsAliases.some(
      ({ name }) =>
        stringSlotKeys(name).some((key) => baseKeys(name).includes(key)) ||
        (framework === "react" && reactRenamed(name).length > 0),
    )
      ? "\n\ntype Without<T, K extends PropertyKey> = T extends unknown\n  ? Omit<T, K>\n  : never"
      : ""
  const slotsMember = {
    react: "ReactNode",
    solid: "JSX.Element",
    svelte: "Snippet",
  }
  const linking = aliases.some(({ node }) => linksBase(node.type))
  const typed = (framework) => {
    const link = linking ? LINK_TYPES[framework] : undefined
    const edits = [
      replacing(
        elementImport,
        framework === "react"
          ? `import type { ${["ComponentProps", ...(link ? ["ComponentType"] : []), ...(slotted.length ? ["ReactNode"] : [])].join(", ")} } from "react"${withoutHelper(framework)}`
          : framework === "solid"
            ? `import type { ${["ComponentProps", ...(slotted.length ? ["JSX"] : [])].join(", ")} } from "@solidjs/web"${link ? '\nimport type { Component } from "solid-js"' : ""}${withoutHelper(framework)}`
            : `import type { SvelteHTMLElements } from "svelte/elements"${slotted.length ? '\nimport type { Snippet } from "svelte"' : ""}${withoutHelper(framework)}`,
      ),
    ]
    for (const alias of aliases) {
      const { name } = alias
      const type = alias.node.type
      const component = componentOf(name)
      const isProps = name.endsWith("Props")
      const model = isProps ? modelsByComponent[component] : undefined
      const slots = isProps ? slotsByComponent[component] : undefined
      const strings = isProps ? stringSlotKeys(name) : []
      const tag = isProps ? customRoot(name) : undefined
      const baseAlias = baseAliases.find((entry) => entry.name.text === name)
      const known = baseAlias ? typeKeys(baseAlias.type, baseAliases) : []
      const kind = MODEL_KINDS[model?.kind]
      const extras =
        framework === "svelte" && kind?.svelte?.typedBindables
          ? model.bindables
              .filter(
                ({ prop }) =>
                  !known.includes(prop) && !declaresProperty(type, prop),
              )
              .toSorted((a, b) => byName(a.prop, b.prop))
          : []
      const callbacks = !!kind?.[framework]?.entries
      const events = isProps ? eventsFor(name) : []
      const omit = [
        ...(slots && !slots.includes("default") ? ["children"] : []),
        ...extras.map(({ prop }) => prop),
        ...(callbacks ? ["defaultValue"] : []),
        ...(tag ? events.map((event) => eventProp(framework, event)) : []),
      ]
      for (const ref of elementRefs(type)) {
        edits.push(
          replacing(
            ref.node,
            omitted(
              framework,
              tag ? JSON.stringify(tag) : ref.element,
              ref.omittable
                ? [
                    ...ref.keys,
                    ...omit,
                    ...(framework === "solid" &&
                    !ref.others?.includes(`keyof Base.${name}`)
                      ? declaredAttributes(
                          tag ? JSON.stringify(tag) : ref.element,
                          known,
                        )
                      : []),
                  ]
                : ref.keys,
              ref.others,
            ),
          ),
        )
      }
      const tied = []
      if (callbacks && kind[framework].tiedCallbacks) {
        const visit = (node) => {
          if (ts.isTypeLiteralNode(node)) {
            const member = node.members.find(
              (entry) =>
                ts.isPropertySignature(entry) &&
                entry.type &&
                entry.name.getText() === model.prop,
            )
            if (member) {
              tied.push(node)
              const valueType = member.type.getText()
              edits.push(
                replacing(
                  node,
                  `{ ${[
                    ...node.members
                      .filter((entry) => entry !== member)
                      .map((entry) => entry.getText().replace(/[;,]$/, "")),
                    `defaultValue?: ${valueType}`,
                    `onValueChange?: (value: ${valueType}) => void`,
                    `${model.prop}?: ${valueType}`,
                  ]
                    .toSorted(byName)
                    .join("; ")} }`,
                ),
              )
              return
            }
          }
          ts.forEachChild(node, visit)
        }
        visit(type)
      }
      if (link && linksBase(type)) {
        const visit = (node) => {
          if (takesLink(node)) {
            if (tied.length > 0) {
              throw unsupported(
                "BC607",
                file,
                `the type ${name}, whose as takes a link component next to a model`,
              )
            }
            edits.push(replacing(node.type, `${node.type.getText()} | ${link}`))
            return
          }
          ts.forEachChild(node, visit)
        }
        visit(type)
      }
      const baseParts = []
      const collect = (node) => {
        if (ts.isIntersectionTypeNode(node)) {
          node.types.forEach((part, index) => {
            if (
              (baseRef(part, name) || omitsBase(part, name)) &&
              index < node.types.length - 1
            ) {
              baseParts.push(part)
            }
          })
        }
        ts.forEachChild(node, collect)
      }
      collect(type)
      if (events.length > 0 && baseParts.length === 0) {
        throw unsupported(
          "BC603",
          file,
          `the type ${name}, which has ${eventsTypeOf(name)} but no Base.${name} to join them to`,
          `start it with Base.${name} &`,
        )
      }
      baseParts.forEach((part) => {
        const withSlots = slotTypes.has(slotsTypeOf(name))
          ? ` & Base.${slotsTypeOf(name)}<${slotsMember[framework]}>`
          : ""
        const handlers = events.length
          ? ` & { ${events.map((event) => `${eventProp(framework, event)}?: (event: Base.${eventsTypeOf(name)}[${JSON.stringify(event)}]) => void`).join("; ")} }`
          : ""
        const untied =
          callbacks && tied.length === 0
            ? ` & { defaultValue?: ${model.type}; onValueChange?: (value: ${model.type}) => void${declaresProperty(type, model.prop) || known.includes(model.prop) ? "" : `; ${model.prop}?: ${model.type}`} }`
            : ""
        const renamed = framework === "react" ? reactRenamed(name) : []
        const omitted = omitsBase(part, name)
          ? literalKeys(part.typeArguments[1])
          : []
        const dropped = [
          ...strings.filter((key) => known.includes(key)),
          ...renamed,
        ].toSorted(byName)
        const baseType = `Base.${name}${link && linked.has(name) ? `<${link}>` : ""}`
        const wrapped = dropped.length
          ? `Without<${baseType}, ${[...omitted, ...dropped]
              .toSorted(byName)
              .map((key) => JSON.stringify(key))
              .join(" | ")}>`
          : omitted.length
            ? part.getText().replace(`Base.${name}`, baseType)
            : baseType
        const baseAlias = baseAliases.find((entry) => entry.name.text === name)
        const reactNames = renamed.length
          ? ` & { ${renamed.map((key) => `${REACT_ATTRIBUTE_NAMES[key]}${baseAlias && requiredKey(baseAlias.type, key, baseAliases) ? "" : "?"}: Base.${name}[${JSON.stringify(key)}]`).join("; ")} }`
          : ""
        edits.push(
          replacing(
            part,
            `${wrapped}${reactNames}${withSlots}${handlers}${untied}`,
          ),
        )
      })
      if (extras.length > 0) {
        edits.push(
          appending(
            type,
            ` & { ${extras.map(({ prop, type: bindable }) => `${prop}?: ${bindable}`).join("; ")} }`,
          ),
        )
      }
    }
    return spliced(astro, edits)
  }
  const react = typed("react")
  const solid = typed("solid")
  const svelte = typed("svelte")
  const based = aliases
    .filter(({ name, node }) =>
      containsKind(node.type, (child) => baseRef(child, name)),
    )
    .map(({ name }) => name)
    .toSorted(byName)
  for (const [component, slots] of Object.entries(slotsByComponent)) {
    const named = slots.filter((slot) => slot !== "default")
    const alias = aliases.find(
      ({ name }) =>
        name === (component === folder ? "Props" : `${component}Props`),
    )
    const covered =
      alias && slotTypes.has(slotsTypeOf(alias.name))
        ? slotKeysOf(slotTypes.get(slotsTypeOf(alias.name))).map(
            (member) => member.name,
          )
        : []
    const uncovered = named.filter(
      (slot) => !covered.includes(slot) && !covered.includes(slotProp(slot)),
    )
    if (uncovered.length > 0) {
      throw unsupported(
        "BC604",
        file,
        `the slot ${uncovered[0]} of ${component}, which types.ts has no Slots type for`,
      )
    }
  }
  let usesSlot = false
  const vueSlotTypes = slotted.map(({ name }) => {
    const slotsName = slotsTypeOf(name)
    const component = componentOf(name)
    const hasDefault = (slotsByComponent[component] ?? ["default"]).includes(
      "default",
    )
    const slotNames = slotsByComponent[component] ?? []
    const named = slotKeysOf(slotTypes.get(slotsName))
      .map((member) => member.name)
      .filter((key) => key !== "children")
      .map((key) => slotNames.find((slot) => slotProp(slot) === key) ?? key)
      .toSorted(byName)
    if (named.length > 0) usesSlot = true
    const literal = named.length
      ? `{ ${named.map((key) => `${propKey(key)}?: Slot`).join("; ")} }`
      : ""
    return `export type ${slotsName} = ${[literal, ...(hasDefault ? ["DefaultSlots"] : [])].filter(Boolean).join(" & ")}`
  })
  const emitting = propsAliases
    .map(({ name }) => name)
    .filter((name) => eventsFor(name).length > 0)
  const vueEmits = emitting.map(
    (name) =>
      `export type ${emitsTypeOf(name)} = { ${eventsFor(name)
        .map(
          (event) =>
            `${event}: [event: Base${eventsTypeOf(name)}[${JSON.stringify(event)}]]`,
        )
        .join("; ")} }`,
  )
  const imported = [...based, ...emitting.map(eventsTypeOf)]
    .map((name) => `${name} as Base${name}`)
    .toSorted(byName)
  const vueText = (node) => {
    const start = node.getStart()
    const edits = []
    const visit = (child) => {
      if (ts.isQualifiedName(child) && child.left.getText() === "Base") {
        edits.push(
          replacing(
            child,
            `Base${child.right.text}${linked.has(child.right.text) ? `<${LINK_TYPES.vue}>` : ""}`,
          ),
        )
        return
      }
      const ref = elementRef(child)
      if (ref) {
        edits.push(
          replacing(
            ref,
            ELEMENT_TYPES.vue(ref.typeArguments[0].literal.getText()),
          ),
        )
        return
      }
      ts.forEachChild(child, visit)
    }
    visit(node)
    return spliced(
      node.getText(),
      edits.map((edit) => ({
        ...edit,
        end: edit.end - start,
        start: edit.start - start,
      })),
    )
  }
  const vueMembers = (alias) => {
    const model = modelsByComponent[componentOf(alias.name)]
    const undeclared = MODEL_KINDS[model?.kind]?.vue?.undeclared
    const modelOnly = (node) =>
      !!undeclared &&
      ts.isTypeLiteralNode(node) &&
      node.members.length > 0 &&
      node.members.every((member) => undeclared(model, member.name.getText()))
    const kept = []
    let hasClass = false
    for (const part of members(alias.node.type)) {
      if (ts.isTypeLiteralNode(part) && hasElement(part)) {
        kept.push(vueText(part))
        continue
      }
      if (hasElement(part)) {
        hasClass = true
        continue
      }
      if (
        modelOnly(part) ||
        (ts.isTypeReferenceNode(part) &&
          part.typeArguments?.length > 0 &&
          part.typeArguments.every(modelOnly))
      ) {
        continue
      }
      if (ts.isTypeLiteralNode(part)) {
        if (part.members.every((member) => member.name.getText() === "as")) {
          continue
        }
        kept.push(part.getText())
        continue
      }
      if (
        containsKind(part, (child) =>
          ts.isTypeReferenceNode(child) && ts.isQualifiedName(child.typeName)
            ? child.typeName.left.getText() === "Base"
            : false,
        ) &&
        ts.isTypeReferenceNode(part) &&
        (ts.isQualifiedName(part.typeName) || isReference(part, "Omit"))
      ) {
        kept.push(vueText(part))
        continue
      }
      throw unsupported(
        "BC602",
        file,
        `the type ${alias.name}, whose part ${part.getText()} has no Vue form`,
      )
    }
    return { hasClass, kept }
  }
  const asValues = (node) => {
    const values = []
    const visit = (child) => {
      if (
        ts.isPropertySignature(child) &&
        child.name.getText() === "as" &&
        child.type
      ) {
        values.push(
          ...literalKeys(child.type).map((key) => JSON.stringify(key)),
        )
        return
      }
      ts.forEachChild(child, visit)
    }
    visit(node)
    return values.toSorted()
  }
  const extrasOf = ({ name, node }) => {
    const component = componentOf(name)
    const baseAlias = baseAliases.find((alias) => alias.name.text === name)
    const known = baseAlias ? typeKeys(baseAlias.type, baseAliases) : []
    const modelled = modelsByComponent[component]
    const extras = (propsByComponent[component] ?? [])
      .filter(
        (prop) =>
          prop !== "as" &&
          !known.includes(prop) &&
          !declaresProperty(node.type, prop) &&
          !MODEL_KINDS[modelled?.kind]?.vue?.undeclared?.(modelled, prop),
      )
      .toSorted(byName)
    const elements = elementsOf(node.type)
    if (
      extras.some((prop) => prop !== modelled?.prop) &&
      elements.length === 0
    ) {
      throw unsupported(
        "BC605",
        file,
        `the prop ${extras[0]} of ${component}, which the Vue types can't take from no element`,
      )
    }
    return extras.map((prop) =>
      modelled?.prop === prop
        ? `${propKey(prop)}?: ${modelled.type}`
        : `${propKey(prop)}?: ${elements
            .map(
              (element) =>
                `IntrinsicElementAttributes[${JSON.stringify(element)}][${JSON.stringify(prop)}]`,
            )
            .join(" | ")}`,
    )
  }
  const extrasByAlias = new Map(
    propsAliases.map((alias) => [alias.name, extrasOf(alias)]),
  )
  const vueAliases = aliases
    .toSorted((a, b) => byName(a.name, b.name))
    .map((alias) => {
      const { name, node } = alias
      if (!name.endsWith("Props")) {
        return `export type ${name} = ${vueText(node.type)}`
      }
      const values = linksBase(node.type) ? [] : asValues(node.type)
      const extras = [
        ...(values.length ? [`as?: ${values.join(" | ")}`] : []),
        ...extrasByAlias.get(name),
      ]
      const { kept } = isUnion(node.type)
        ? {
            kept: based.includes(name)
              ? [`Base${name}${linked.has(name) ? `<${LINK_TYPES.vue}>` : ""}`]
              : [],
          }
        : vueMembers(alias)
      const withoutAttributes = kept.map((entry) => {
        const baseAlias = baseAliases.find(
          (candidate) =>
            `Base${candidate.name.text}` ===
            entry.replace(`<${LINK_TYPES.vue}>`, ""),
        )
        const attributes = baseAlias
          ? attributeKeys(baseAlias.type, baseAliases)
          : []
        if (!attributes.length) return entry
        const unions = members(baseAlias.type).filter(
          (part) =>
            isUnion(part) &&
            !attributeKeys(part, baseAliases).length &&
            !containsKind(part, ts.isTypeReferenceNode),
        )
        return [
          `Omit<${entry}, ${attributes.map((key) => JSON.stringify(key)).join(" | ")}>`,
          ...unions.map((part) =>
            ts.isParenthesizedTypeNode(part)
              ? part.getText()
              : `(${part.getText()})`,
          ),
        ].join(" & ")
      })
      return `export type ${name} = ${[...withoutAttributes, "Class", ...(extras.length ? [`{ ${extras.join("; ")} }`] : [])].join(" & ")}`
    })
  const vueTypeImports = [
    ...(linking ? ["Component"] : []),
    ...([...extrasByAlias.values()].some((extras) => extras.length > 0) ||
    vueAliases.some((alias) => alias.includes("IntrinsicElementAttributes["))
      ? ["IntrinsicElementAttributes"]
      : []),
    ...(usesSlot ? ["Slot"] : []),
  ]
  const defaultOnlySlotTypes = slotTypes.has("Slots")
    ? propsAliases
        .filter(
          ({ name }) =>
            name !== "Props" &&
            !slotTypes.has(slotsTypeOf(name)) &&
            (slotsByComponent[componentOf(name)] ?? []).includes("default"),
        )
        .map(({ name }) => `export type ${slotsTypeOf(name)} = DefaultSlots`)
    : []
  const vueBody = [
    ...vueAliases,
    ...vueEmits,
    ...(slotTypes.has("Slots") ||
    !(slotsByComponent[folder] ?? ["default"]).includes("default")
      ? []
      : ["export type Slots = DefaultSlots"]),
    ...[...vueSlotTypes, ...defaultOnlySlotTypes].toSorted(byName),
  ]
  const vue = [
    [
      ...(vueTypeImports.length
        ? [`import type { ${vueTypeImports.join(", ")} } from "vue"`]
        : []),
      `import type { Class${vueBody.some((line) => line.includes("DefaultSlots")) ? ", DefaultSlots" : ""} } from "../vue"`,
      `import type {\n${imported.map((entry) => `  ${entry},`).join("\n")}\n} from "./types"`,
    ].join("\n"),
    ...vueBody,
  ].join("\n\n")
  return { react, solid, svelte, vue: `${vue}\n` }
}

export const astroTypesOf = (file) => {
  const path = join(root, dirname(file), "types.astro.ts")
  return existsSync(path) ? readFileSync(path, "utf8") : undefined
}

export const baseTypesOf = (file) => {
  const path = join(root, dirname(file), "types.ts")
  return existsSync(path) ? readFileSync(path, "utf8") : undefined
}

export const basePropsOf = (base, name, folder) => {
  if (!base) return []
  const aliases = sourceFileOf(base, "types.ts").statements.filter(
    ts.isTypeAliasDeclaration,
  )
  const alias = aliases.find(
    (statement) =>
      statement.name.text === (name === folder ? "Props" : `${name}Props`),
  )
  return alias ? typeKeys(alias.type, aliases) : []
}

export const hasSlotsType = (base) =>
  !!base &&
  sourceFileOf(base, "types.ts").statements.some(
    (statement) =>
      ts.isTypeAliasDeclaration(statement) && statement.name.text === "Slots",
  )

export const stringTypedSlots = (base, name, folder, slots) => {
  if (!base) return []
  const alias = sourceFileOf(base, "types.ts")
    .statements.filter(ts.isTypeAliasDeclaration)
    .find(
      (statement) =>
        statement.name.text === (name === folder ? "Slots" : `${name}Slots`),
    )
  if (!alias) return []
  return slotMembers(alias.type, alias.typeParameters?.[0]?.name.text ?? "S")
    .filter((member) => member.string)
    .map((member) => member.name)
    .filter((key) => slots.some((slot) => slotProp(slot) === key))
}

export const propsElement = (types, propsType) => {
  if (!types) return undefined
  const alias = typeAliases(sourceFileOf(types, "types.astro.ts")).find(
    ({ name }) => name === propsType,
  )
  if (!alias) return undefined
  const elements = elementsOf(alias.node.type)
  return elements.length === 1 ? elements[0] : undefined
}
