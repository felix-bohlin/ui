import fs from "node:fs"
import path from "node:path"
import ts from "typescript"
import {
  frameworks,
  slotProp,
  type ComponentFramework,
  type Framework,
} from "../component-api/frameworks"
import type { ApiOption, ComponentApi } from "../component-api/types"
import { isHydratedFramework } from "./framework"

const root = path.resolve("packages/opui/components")

const read = (source: string | undefined, file: string) => {
  if (!source) return undefined
  const filePath = path.join(root, source, file)
  return fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf-8")
    : undefined
}

const typeFiles = () =>
  fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap(({ name }) =>
      fs
        .readdirSync(path.join(root, name))
        .filter((file) => /^types.*\.ts$/.test(file))
        .map((file) => path.join(root, name, file)),
    )
    .sort()

const frameworkTypes = new Set(
  Object.values(frameworks).map((syntax) => syntax.types),
)

let cache: { key: string; program: ts.Program } | undefined

const program = () => {
  const files = typeFiles()
  const key = files.map((file) => `${file}:${fs.statSync(file).mtimeMs}`).join()
  if (cache?.key !== key) {
    cache = {
      key,
      program: ts.createProgram(
        files.filter((file) => frameworkTypes.has(path.basename(file))),
        {
          jsx: ts.JsxEmit.Preserve,
          module: ts.ModuleKind.ESNext,
          moduleResolution: ts.ModuleResolutionKind.Bundler,
          noEmit: true,
          skipLibCheck: true,
          strict: true,
          target: ts.ScriptTarget.ESNext,
          types: [],
        },
      ),
    }
  }
  return cache.program
}

export const splitUnion = (text: string) => {
  const parts: string[] = []
  let depth = 0
  let current = ""
  for (const char of text) {
    if ("(<[{".includes(char)) depth++
    if (")>]}".includes(char)) depth--
    if (char === "|" && depth === 0) {
      parts.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  parts.push(current.trim())
  return parts
}

const cleanType = (text: string) => {
  const parts = splitUnion(text).filter(
    (part) => part !== "undefined" && part !== "null",
  )
  const hasString = parts.includes("string")
  return parts
    .filter((part) => !(hasString && /^\(string & .+\)$/.test(part)))
    .map((part) => {
      const types = [
        ...new Set(
          part
            .replace(/^\((.*)\)$/, "$1")
            .replaceAll("Snippet<[]>", "Snippet")
            .split(" & "),
        ),
      ]
      return types.length === 1 ? types[0] : part
    })
    .toSorted((a, b) => a.localeCompare(b))
    .join(" | ")
}

type Target = Pick<ComponentApi, "component" | "source">

export const modelsFor = (api: ComponentApi, framework: ComponentFramework) =>
  api.model ? (api.model.frameworks?.[framework] ?? [api.model]) : []

export const hydrationFor = (
  api: ComponentApi,
  framework: ComponentFramework,
) =>
  isHydratedFramework(framework)
    ? (api.hydration?.[framework] ?? api.hydration?.default ?? [])
    : []

export const appliesTo = (option: ApiOption, framework: Framework) =>
  !option.frameworks || option.frameworks.includes(framework)

export const hasDefaultSlot = (api: ComponentApi) =>
  api.slots?.some((slot) => slot.name === "default") ||
  api.parts.some((part) => part.slots?.includes("default"))

const componentFile = (target: Target, framework: ComponentFramework) =>
  frameworks[framework].component(target.component)

export const shipped = (target: Target, framework: ComponentFramework) =>
  read(target.source, componentFile(target, framework)) !== undefined

export const frameworkProps = (
  target: Target,
  framework: ComponentFramework,
) => {
  const props = new Map<string, string>()
  if (!target.source) return props
  const filePath = path.join(root, target.source, frameworks[framework].types)
  const aliases = program()
    .getSourceFile(filePath)
    ?.statements.filter(ts.isTypeAliasDeclaration)
  const alias = [
    `${target.component}Props`,
    ...(target.component === target.source ? ["Props"] : []),
  ]
    .map((name) => aliases?.find((statement) => statement.name.text === name))
    .find(Boolean)
  if (!alias) return props

  const checker = program().getTypeChecker()
  const componentRoot = root.replaceAll("\\", "/")
  const type = checker.getTypeAtLocation(alias)
  ;[type, ...(type.isUnion() ? type.types : [])]
    .flatMap((member) => checker.getPropertiesOfType(member))
    .filter((symbol) =>
      symbol.declarations?.some((declaration) =>
        declaration
          .getSourceFile()
          .fileName.replaceAll("\\", "/")
          .startsWith(componentRoot),
      ),
    )
    .filter((symbol) => symbol.name !== "class")
    .forEach((symbol) => {
      if (props.has(symbol.name)) return
      const type = checker.typeToString(
        checker.getTypeOfSymbolAtLocation(symbol, alias),
        undefined,
        ts.TypeFormatFlags.NoTruncation,
      )
      props.set(symbol.name, cleanType(type))
    })
  return props
}

export const slotNames = (target: Target, framework: ComponentFramework) => {
  if (frameworks[framework].slotsAreProps) return []
  const text = read(target.source, componentFile(target, framework))
  if (!text) return []

  const names = [
    ...[...text.matchAll(/<slot\b([^>]*)>/g)].map(
      ([, attributes]) =>
        attributes.match(/\bname="([^"]+)"/)?.[1] ?? "default",
    ),
    ...[...text.matchAll(/Astro\.slots\.render\("([^"]+)"/g)].map(
      ([, name]) => name,
    ),
    ...[...text.matchAll(/\bslots\.([\w-]+)\?\.\(/g)].map(([, name]) => name),
  ]
  return [...new Set(names)].sort()
}

export const describe = (
  api: ComponentApi,
  name: string,
  framework: ComponentFramework,
  kind: "prop" | "slot",
) => {
  const syntax = frameworks[framework]
  const matches = (slot: string) =>
    kind === "slot" ? slot === name : slotProp(slot) === name
  const legacyOf = (primary: string) =>
    kind === "slot"
      ? `Legacy alias of the \`${primary}\` slot.`
      : `Legacy alias of \`${primary}\`.`

  if (kind === "prop") {
    const option = api.options.find(
      (option) => option.prop === name && appliesTo(option, framework),
    )
    if (option) return option.description
    const model = modelsFor(api, framework).find((model) => model.prop === name)
    if (model) return model.description
  }

  for (const part of api.parts) {
    if (kind === "prop" && part.props?.includes(name)) return part.description
    if (kind === "prop" && part.legacy?.props?.includes(name)) {
      return legacyOf(part.props?.[0] ?? "")
    }
    if (kind === "prop" && part.snippets?.includes(name)) {
      return part.description
    }
    if (part.slots?.some(matches)) return part.description
    if (part.legacy?.slots?.some(matches)) {
      const primary = part.slots?.[0] ?? ""
      return legacyOf(kind === "slot" ? primary : syntax.slot(primary))
    }
  }

  return api.slots?.find((slot) => matches(slot.name))?.description
}

const reported = new Set<string>()

export const reportProblems = (problems: string[]) => {
  const fresh = [...new Set(problems)].filter(
    (problem) => !reported.has(problem),
  )
  if (fresh.length === 0) return
  fresh.forEach((problem) => reported.add(problem))
  const message = fresh.map((problem) => `[component-api] ${problem}`)
  if (import.meta.env.PROD) throw new Error(message.join("\n"))
  console.warn(message.join("\n"))
}

const all = Object.keys(frameworks) as ComponentFramework[]

export const checkExports = (apis: ComponentApi[]) => {
  const covered = new Set(
    apis.flatMap((api) => [
      api.component,
      ...api.parts.flatMap((part) => part.component ?? []),
    ]),
  )
  return all.flatMap((framework) =>
    [
      ...fs
        .readFileSync(
          path.resolve("packages/opui", framework, "index.ts"),
          "utf-8",
        )
        .matchAll(/^export \{ default as (\w+) \}/gm),
    ]
      .map(([, name]) => name)
      .filter((name) => !covered.has(name))
      .map((name) => `${name} (${framework}): exported but not documented`),
  )
}

export const checkApi = (api: ComponentApi) => {
  const problems: string[] = []
  const report = (message: string, framework?: ComponentFramework) =>
    problems.push(
      `${api.component}${framework ? ` (${framework})` : ""}: ${message}`,
    )

  if (
    api.page &&
    !fs.existsSync(path.resolve("src/docs/components", `${api.page}.astro`))
  ) {
    report(`page "${api.page}" does not exist`)
  }

  const groups = api.options.flatMap((option) => option.group ?? [])
  groups
    .filter((group, i) => groups.indexOf(group) !== i)
    .forEach((group) =>
      report(`group "${group}" is used by more than one option`),
    )

  const shippedIn = all.filter((framework) => shipped(api, framework))
  if (api.source && shippedIn.length === 0) {
    report(`no framework has a component file in "${api.source}"`)
  }
  all
    .filter((framework) => !shippedIn.includes(framework))
    .filter((framework) => hydrationFor(api, framework).length > 0)
    .forEach((framework) =>
      report("hydration for a missing component", framework),
    )

  const props = new Map(
    shippedIn.map((framework) => [framework, frameworkProps(api, framework)]),
  )

  props.forEach((declared, framework) => {
    const exists = (kind: string, name: string) => {
      if (!declared.has(name)) {
        report(`${kind} "${name}" does not exist`, framework)
      }
    }

    hydrationFor(api, framework).forEach((entry) =>
      exists("hydration prop", entry.prop),
    )
    declared.forEach((_, prop) => {
      if (!describe(api, prop, framework, "prop")) {
        report(`prop "${prop}" is not documented`, framework)
      }
    })
    api.options
      .filter((option) => appliesTo(option, framework) && !option.inherited)
      .forEach((option) => exists("prop", option.prop))
    api.parts
      .flatMap((part) => [...(part.props ?? []), ...(part.legacy?.props ?? [])])
      .forEach((prop) => exists("part prop", prop))
    api.options
      .filter((option) => appliesTo(option, framework))
      .forEach((option) => {
        const type = declared.get(option.prop)
        if (!option.values || !type) return
        const literals = [...type.matchAll(/"([^"]+)"/g)].map(
          ([, value]) => value,
        )
        const values = Object.keys(option.values)
        literals
          .filter((value) => !values.includes(value))
          .forEach((value) =>
            report(
              `value "${value}" of "${option.prop}" is not documented`,
              framework,
            ),
          )
        values
          .filter((value) => !literals.includes(value))
          .forEach((value) =>
            report(
              `value "${value}" of "${option.prop}" does not exist`,
              framework,
            ),
          )
      })

    if (frameworks[framework].slotsAreProps) {
      ;[
        ...(api.slots ?? []).map((slot) => slot.name),
        ...api.parts.flatMap((part) =>
          part.snippets
            ? []
            : [...(part.slots ?? []), ...(part.legacy?.slots ?? [])],
        ),
      ]
        .filter((slot) => slot !== "default")
        .forEach((slot) => exists("slot prop", slotProp(slot)))
      api.parts
        .flatMap((part) => part.snippets ?? [])
        .forEach((snippet) => exists("snippet", snippet))
      return
    }

    const slots = slotNames(api, framework)
    slots.forEach((slot) => {
      if (!describe(api, slot, framework, "slot")) {
        report(`slot "${slot}" is not documented`, framework)
      }
    })
    ;[
      ...(api.slots ?? []).map((slot) => slot.name),
      ...api.parts.flatMap((part) => [
        ...(part.slots ?? []),
        ...(part.legacy?.slots ?? []),
      ]),
    ].forEach((slot) => {
      if (!slots.includes(slot)) {
        report(`slot "${slot}" does not exist`, framework)
      }
    })
  })

  api.options
    .filter((option) => option.inherited)
    .forEach((option) => {
      const applies = [...props].filter(([framework]) =>
        appliesTo(option, framework),
      )
      if (
        applies.length > 0 &&
        applies.every(([, declared]) => declared.has(option.prop))
      ) {
        report(`prop "${option.prop}" is declared everywhere, drop "inherited"`)
      }
    })

  return problems
}
