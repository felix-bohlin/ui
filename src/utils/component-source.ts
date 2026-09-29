import fs from "node:fs"
import path from "node:path"
import ts from "typescript"
import {
  frameworks,
  slotProp,
  type ComponentFramework,
} from "../component-api/frameworks"
import type { ComponentApi } from "../component-api/types"

const root = path.resolve("packages/opui/components")

const read = (source: string, file: string) => {
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

let cache: { key: string; program: ts.Program } | undefined

const program = () => {
  const files = typeFiles()
  const key = files.map((file) => `${file}:${fs.statSync(file).mtimeMs}`).join()
  if (cache?.key !== key) {
    cache = {
      key,
      program: ts.createProgram(files, {
        jsx: ts.JsxEmit.Preserve,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        noEmit: true,
        skipLibCheck: true,
        strict: true,
        target: ts.ScriptTarget.ESNext,
        types: [],
      }),
    }
  }
  return cache.program
}

const splitUnion = (text: string) => {
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
    .map((part) => part.replace(/^Snippet<\[\]>$/, "Snippet"))
    .join(" | ")
}

export const shipped = (source: string, framework: ComponentFramework) =>
  read(source, frameworks[framework].component(source)) !== undefined

export const frameworkProps = (
  source: string,
  framework: ComponentFramework,
) => {
  const props = new Map<string, string>()
  const filePath = path.join(root, source, frameworks[framework].types)
  const file = program().getSourceFile(filePath)
  const alias = file?.statements.find(
    (statement) =>
      ts.isTypeAliasDeclaration(statement) && statement.name.text === "Props",
  )
  if (!alias) return props

  const checker = program().getTypeChecker()
  const componentRoot = root.replaceAll("\\", "/")
  checker
    .getPropertiesOfType(checker.getTypeAtLocation(alias))
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
      const type = checker.typeToString(
        checker.getTypeOfSymbolAtLocation(symbol, alias),
        undefined,
        ts.TypeFormatFlags.NoTruncation,
      )
      props.set(symbol.name, cleanType(type))
    })
  return props
}

export const slotNames = (source: string, framework: ComponentFramework) => {
  if (frameworks[framework].slotsAreProps) return []
  const text = read(source, frameworks[framework].component(source))
  if (!text) return []

  const names = [...text.matchAll(/<slot\b([^>]*)>/g)].map(
    ([, attributes]) => attributes.match(/\bname="([^"]+)"/)?.[1] ?? "default",
  )
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
    const option = api.options.find((option) => option.prop === name)
    if (option) return option.description
  }

  for (const part of api.parts) {
    if (kind === "prop" && part.props?.includes(name)) return part.description
    if (kind === "prop" && part.legacy?.props?.includes(name)) {
      return legacyOf(part.props?.[0] ?? "")
    }
    if (part.slots?.some(matches)) return part.description
    if (part.legacy?.slots?.some(matches)) {
      const primary = part.slots?.[0] ?? ""
      return legacyOf(kind === "slot" ? primary : syntax.slot(primary))
    }
  }

  return api.slots?.find((slot) => matches(slot.name))?.description
}

const warned = new Set<string>()

const warn = (message: string) => {
  if (warned.has(message)) return
  warned.add(message)
  console.warn(`[component-api] ${message}`)
}

export const checkApi = (api: ComponentApi) => {
  const all = Object.keys(frameworks) as ComponentFramework[]
  all
    .filter((framework) => shipped(api.source, framework))
    .forEach((framework) => {
      const props = frameworkProps(api.source, framework)
      props.forEach((_, prop) => {
        if (!describe(api, prop, framework, "prop")) {
          warn(
            `${api.component} (${framework}): prop "${prop}" is not documented`,
          )
        }
      })
      api.options
        .filter((option) => !option.frameworks)
        .forEach((option) => {
          if (!props.has(option.prop)) {
            warn(
              `${api.component} (${framework}): prop "${option.prop}" does not exist`,
            )
          }
        })
      api.options.forEach((option) => {
        const type = props.get(option.prop)
        if (!option.values || !type) return
        const literals = [...type.matchAll(/"([^"]+)"/g)].map(
          ([, value]) => value,
        )
        const values = Object.keys(option.values)
        literals
          .filter((value) => !values.includes(value))
          .forEach((value) =>
            warn(
              `${api.component} (${framework}): value "${value}" of "${option.prop}" is not documented`,
            ),
          )
        values
          .filter((value) => !literals.includes(value))
          .forEach((value) =>
            warn(
              `${api.component} (${framework}): value "${value}" of "${option.prop}" does not exist`,
            ),
          )
      })

      if (frameworks[framework].slotsAreProps) return

      const slots = slotNames(api.source, framework)
      slots.forEach((slot) => {
        if (!describe(api, slot, framework, "slot")) {
          warn(
            `${api.component} (${framework}): slot "${slot}" is not documented`,
          )
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
          warn(`${api.component} (${framework}): slot "${slot}" does not exist`)
        }
      })
    })
}
