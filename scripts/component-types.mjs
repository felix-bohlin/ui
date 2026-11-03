import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import {
  byName,
  propKey,
  root,
  sourceFileOf,
  unsupported,
} from "./component-shared.mjs"

const HTML_ATTRIBUTES = /HTMLAttributes<("[^"]+")>/g

const typeAliases = (code) =>
  sourceFileOf(code, "types.ts")
    .statements.filter(ts.isTypeAliasDeclaration)
    .map((statement) => ({
      name: statement.name.text,
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

const slotMembers = (node, parameter) =>
  ts.isTypeLiteralNode(node)
    ? node.members
        .filter(
          (member) =>
            ts.isPropertySignature(member) &&
            member.type &&
            new RegExp(`\\b${parameter}\\b`).test(member.type.getText()),
        )
        .map((member) => ({
          name: member.name.getText(),
          text: member.type.getText(),
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

export const toTypes = (
  folder,
  { astro, base },
  slotsByComponent,
  propsByComponent = {},
  rootsByComponent = {},
  modelsByComponent = {},
) => {
  const file = `packages/opui/components/${folder}/types.astro.ts`
  if (!astro.includes('import type * as Base from "./types"')) {
    throw unsupported(file, "a types.astro.ts without the Base import")
  }
  const baseFile = sourceFileOf(base, "types.ts")
  const baseAliases = baseFile.statements.filter(ts.isTypeAliasDeclaration)
  const slotTypes = new Map(
    baseAliases
      .filter(({ name }) => name.text.endsWith("Slots"))
      .map((alias) => [alias.name.text, alias]),
  )
  const slotsTypeOf = (name) =>
    name === "Props" ? "Slots" : name.replace(/Props$/, "Slots")
  const componentOf = (name) =>
    name === "Props" ? folder : name.replace(/Props$/, "")
  const aliases = typeAliases(astro)
  for (const alias of aliases) {
    if (!/^export type \w+ =[\s\S]*HTMLAttributes</.test(alias.text)) {
      throw unsupported(file, `the type ${alias.name}`)
    }
  }
  const propsAliases = aliases.filter(({ name }) => name.endsWith("Props"))
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
        file,
        `the type ${slotsTypeOf(name)}, which names no slot`,
      )
    }
    const overlap = slotKeysOf(slotsAlias)
      .filter((member) => !/\bstring\b/.test(member.text))
      .map((member) => member.name)
      .filter((key) =>
        (propsAlias ? typeKeys(propsAlias.type, baseAliases) : []).includes(
          key,
        ),
      )
    if (overlap.length > 0) {
      throw unsupported(
        file,
        `a prop and a slot both named ${overlap.join(", ")}`,
      )
    }
    const astroSlots = slotsByComponent[componentOf(name)] ?? []
    const pureSlots = slotKeysOf(slotsAlias)
      .filter((member) => !/\bstring\b/.test(member.text))
      .map((member) => member.name)
      .filter((key) => !astroSlots.some((slot) => slotProp(slot) === key))
    if (pureSlots.some((key) => /[A-Z]/.test(key))) {
      throw unsupported(
        file,
        `the slot ${pureSlots.find((key) => /[A-Z]/.test(key))}, whose Vue name is kebab-case`,
      )
    }
  }
  const withSlots = (text, name, member) =>
    slotTypes.has(slotsTypeOf(name))
      ? text.replaceAll(
          new RegExp(`(Base\\.${name}|Without<Base\\.${name}, [^>]+>) &`, "g"),
          `$1 & Base.${slotsTypeOf(name)}<${member}> &`,
        )
      : text
  const customRoot = (name) => {
    const roots = rootsByComponent[componentOf(name)] ?? []
    return roots.length === 1 && roots[0].includes("-") ? roots[0] : undefined
  }
  const stringSlotKeys = (name) =>
    slotTypes.has(slotsTypeOf(name))
      ? slotKeysOf(slotTypes.get(slotsTypeOf(name)))
          .filter((member) => /\bstring\b/.test(member.text))
          .map((member) => member.name)
          .toSorted(byName)
      : []
  const omitting = (text, keys) =>
    text
      .replace(
        /Omit<\s*HTMLAttributes<("[^"]+")>\s*,\s*((?:"[^"]+"\s*\|?\s*)+)>/g,
        (_, element, existing) =>
          `Omit<HTMLAttributes<${element}>, ${[
            ...new Set([
              ...[...existing.matchAll(/"[^"]+"/g)].map(([key]) => key),
              ...keys.map((key) => JSON.stringify(key)),
            ]),
          ]
            .toSorted()
            .join(" | ")}>`,
      )
      .replace(
        /HTMLAttributes<("[^"]+")>(?!\s*,)/g,
        (_, element) =>
          `Omit<HTMLAttributes<${element}>, ${keys
            .map((key) => JSON.stringify(key))
            .toSorted()
            .join(" | ")}>`,
      )
  const withoutChildren = (text) => omitting(text, ["children"])
  const elementTyped = propsAliases.reduce((text, alias) => {
    const tag = customRoot(alias.name)
    const slots = slotsByComponent[componentOf(alias.name)]
    const strings = stringSlotKeys(alias.name)
    let adjusted = tag
      ? alias.text.replace(HTML_ATTRIBUTES, `HTMLAttributes<"${tag}">`)
      : alias.text
    if (slots && !slots.includes("default"))
      adjusted = withoutChildren(adjusted)
    if (strings.length > 0) {
      adjusted = adjusted.replaceAll(
        `Base.${alias.name} &`,
        `Without<Base.${alias.name}, ${strings.map((key) => JSON.stringify(key)).join(" | ")}> &`,
      )
    }
    return text.replace(alias.text, adjusted)
  }, astro)
  const svelteTyped = propsAliases.reduce((text, alias) => {
    const model = modelsByComponent[componentOf(alias.name)]
    if (!model || model.kind === "value") return text
    const baseAlias = baseAliases.find(
      (entry) => entry.name.text === alias.name,
    )
    const known = baseAlias ? typeKeys(baseAlias.type, baseAliases) : []
    const current = [...text.matchAll(/export type \w+ =[^]*?(?=\n\n|\n?$)/g)]
      .map(([match]) => match)
      .find((match) => match.startsWith(`export type ${alias.name} =`))
    const extras = model.bindables
      .filter(
        ({ prop }) =>
          !known.includes(prop) &&
          !(current && new RegExp(`\\b${prop}\\??:`).test(current)),
      )
      .toSorted((a, b) => byName(a.prop, b.prop))
    if (extras.length === 0) return text
    return current
      ? text.replace(
          current,
          `${omitting(
            current,
            extras.map(({ prop }) => prop),
          )} & { ${extras.map(({ prop, type }) => `${prop}?: ${type}`).join("; ")} }`,
        )
      : text
  }, elementTyped)
  const reactTyped = propsAliases.reduce((text, alias) => {
    const model = modelsByComponent[componentOf(alias.name)]
    if (model?.kind !== "group") return text
    const current = [...text.matchAll(/export type \w+ =[^]*?(?=\n\n|\n?$)/g)]
      .map(([match]) => match)
      .find((match) => match.startsWith(`export type ${alias.name} =`))
    if (!current) return text
    const declaresProp = new RegExp(`\\b${model.prop}\\??:`).test(current)
    const literals = []
    const visit = (node) => {
      if (ts.isTypeLiteralNode(node)) {
        const member = node.members.find(
          (entry) =>
            ts.isPropertySignature(entry) &&
            entry.type &&
            entry.name.getText() === model.prop,
        )
        if (member) {
          literals.push({
            end: node.end,
            members: node.members
              .filter((entry) => entry !== member)
              .map((entry) => entry.getText().replace(/[;,]$/, "")),
            start: node.getStart(),
            type: member.type.getText(),
          })
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(sourceFileOf(current, "types.astro.ts"))
    const tied = literals.length
      ? literals
          .toReversed()
          .reduce(
            (text, { end, members, start, type }) =>
              `${text.slice(0, start)}{ ${[
                ...members,
                `defaultValue?: ${type}`,
                `onValueChange?: (value: ${type}) => void`,
                `${model.prop}?: ${type}`,
              ]
                .toSorted(byName)
                .join("; ")} }${text.slice(end)}`,
            current,
          )
      : current.replace(
          `Base.${alias.name} &`,
          `Base.${alias.name} & { defaultValue?: ${model.type}; onValueChange?: (value: ${model.type}) => void${declaresProp ? "" : `; ${model.prop}?: ${model.type}`} } &`,
        )
    const typed = omitting(tied, ["defaultValue"])
    return text.replace(current, typed)
  }, elementTyped)
  const usesWithout = elementTyped.includes("Without<")
  const withoutHelper = usesWithout
    ? "\n\ntype Without<T, K extends PropertyKey> = T extends unknown\n  ? Omit<T, K>\n  : never"
    : ""
  const asValues = (text) =>
    [...text.matchAll(/\bas\??: ("[^"]+")/g)]
      .map((match) => match[1])
      .toSorted()
  const react = aliases
    .reduce(
      (text, { name }) => withSlots(text, name, "ReactNode"),
      reactTyped.replace(
        'import type { HTMLAttributes } from "astro/types"',
        `import type { ComponentProps${slotted.length ? ", ReactNode" : ""} } from "react"${withoutHelper}`,
      ),
    )
    .replace(HTML_ATTRIBUTES, "ComponentProps<$1>")
  const svelte = aliases
    .reduce(
      (text, { name }) => withSlots(text, name, "Snippet"),
      svelteTyped.replace(
        'import type { HTMLAttributes } from "astro/types"',
        `import type { SvelteHTMLElements } from "svelte/elements"${slotted.length ? '\nimport type { Snippet } from "svelte"' : ""}${withoutHelper}`,
      ),
    )
    .replace(HTML_ATTRIBUTES, "SvelteHTMLElements[$1]")
  const based = aliases
    .filter(({ name, text }) => text.includes(`Base.${name}`))
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
  const imported = based
    .map((name) => `${name} as Base${name}`)
    .toSorted(byName)
  const vueMembers = (alias) => {
    const model = modelsByComponent[componentOf(alias.name)]
    const modelOnly = (node) =>
      model?.kind === "group" &&
      ts.isTypeLiteralNode(node) &&
      node.members.length > 0 &&
      node.members.every((member) => member.name.getText() === model.prop)
    const node = sourceFileOf(alias.text, "types.astro.ts").statements[0].type
    const parts = ts.isIntersectionTypeNode(node) ? node.types : [node]
    const kept = []
    let hasClass = false
    for (const part of parts) {
      const text = part.getText()
      if (new RegExp(HTML_ATTRIBUTES.source).test(text)) {
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
        kept.push(text)
        continue
      }
      if (/^(?:Omit<)?Base\.\w+/.test(text)) {
        kept.push(text.replace(/Base\.(\w+)/g, "Base$1"))
        continue
      }
      throw unsupported(
        file,
        `the type ${alias.name}, whose part ${text} has no Vue form`,
      )
    }
    return { hasClass, kept }
  }
  const extrasOf = ({ name, text }) => {
    const component = componentOf(name)
    const baseAlias = baseAliases.find((alias) => alias.name.text === name)
    const known = baseAlias ? typeKeys(baseAlias.type, baseAliases) : []
    const modelled = modelsByComponent[component]
    const extras = (propsByComponent[component] ?? [])
      .filter(
        (prop) =>
          prop !== "as" &&
          !known.includes(prop) &&
          !(modelled?.kind === "group" && prop === modelled.prop),
      )
      .toSorted(byName)
    const elements = [...text.matchAll(HTML_ATTRIBUTES)].map(([, element]) =>
      JSON.parse(element),
    )
    if (
      extras.some((prop) => prop !== modelled?.prop) &&
      elements.length !== 1
    ) {
      throw unsupported(
        file,
        `the prop ${extras[0]} of ${component}, which the Vue types can't take from ${elements.length} elements`,
      )
    }
    return extras.map((prop) =>
      modelled?.prop === prop
        ? `${propKey(prop)}?: ${modelled.type}`
        : `${propKey(prop)}?: IntrinsicElementAttributes[${JSON.stringify(elements[0])}][${JSON.stringify(prop)}]`,
    )
  }
  const extrasByAlias = new Map(
    propsAliases.map((alias) => [alias.name, extrasOf(alias)]),
  )
  const vueAliases = aliases
    .toSorted((a, b) => byName(a.name, b.name))
    .map((alias) => {
      const { name, text } = alias
      if (!name.endsWith("Props")) {
        return `export type ${name} = ${text
          .replace(/^export type \w+ =\s*/, "")
          .replace(/Base\.(\w+)/g, "Base$1")
          .replace(HTML_ATTRIBUTES, "IntrinsicElementAttributes[$1]")}`
      }
      const values = asValues(text)
      const members = [
        ...(values.length ? [`as?: ${values.join(" | ")}`] : []),
        ...extrasByAlias.get(name),
      ]
      const { kept } = isUnion(
        sourceFileOf(text, "types.astro.ts").statements[0].type,
      )
        ? { kept: based.includes(name) ? [`Base${name}`] : [] }
        : vueMembers(alias)
      return `export type ${name} = ${[...kept, "Class", ...(members.length ? [`{ ${members.join("; ")} }`] : [])].join(" & ")}`
    })
  const vueTypeImports = [
    ...([...extrasByAlias.values()].some((extras) => extras.length > 0) ||
    vueAliases.some((alias) => alias.includes("IntrinsicElementAttributes["))
      ? ["IntrinsicElementAttributes"]
      : []),
    ...(usesSlot ? ["Slot"] : []),
  ]
  const vueBody = [
    ...vueAliases,
    ...(slotTypes.has("Slots") ? [] : ["export type Slots = DefaultSlots"]),
    ...vueSlotTypes,
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
  return { react, svelte, vue: `${vue}\n` }
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
    .filter((member) => /\bstring\b/.test(member.text))
    .map((member) => member.name)
    .filter((key) => slots.some((slot) => slotProp(slot) === key))
}

export const propsElement = (types, propsType) => {
  if (!types) return undefined
  const alias = typeAliases(types).find(({ name }) => name === propsType)
  const elements = [...(alias?.text.matchAll(HTML_ATTRIBUTES) ?? [])].map(
    ([, element]) => JSON.parse(element),
  )
  return elements.length === 1 ? elements[0] : undefined
}
