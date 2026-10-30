import { join } from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const root = fileURLToPath(new URL("..", import.meta.url))
const virtualFile = join(root, "src/component-examples/react-props.tsx")
const virtualSource = `import type { JSX } from "react"
import * as ui from "opui-css/react"
import "../../packages/opui/react/elements"
export type Intrinsic = JSX.IntrinsicElements
export type Components = typeof ui
`

const ALIASES = { class: "className", for: "htmlFor" }

const compilerOptions = () =>
  ts.parseJsonConfigFileContent(
    {
      compilerOptions: {
        jsx: "preserve",
        lib: ["esnext", "dom", "dom.iterable"],
        module: "esnext",
        moduleResolution: "bundler",
        noEmit: true,
        skipLibCheck: true,
        strict: true,
        target: "esnext",
        types: [],
      },
    },
    ts.sys,
    root,
  ).options

export const createProgram = (files = new Map()) => {
  const options = compilerOptions()
  const sources = new Map([[virtualFile, virtualSource], ...files])
  const host = ts.createCompilerHost(options)
  const { fileExists, getSourceFile, readFile } = host
  host.fileExists = (file) => sources.has(file) || fileExists(file)
  host.readFile = (file) => sources.get(file) ?? readFile(file)
  host.getSourceFile = (file, ...rest) =>
    sources.has(file)
      ? ts.createSourceFile(file, sources.get(file), rest[0])
      : getSourceFile(file, ...rest)
  return ts.createProgram([...sources.keys()], options, host)
}

export const typeDiagnostics = (samples) => {
  const files = new Map(
    [...samples].map(([name, code]) => [
      join(root, "src/component-examples/sample", name),
      code,
    ]),
  )
  const program = createProgram(files)
  return new Map(
    [...files.keys()].map((path, index) => [
      [...samples.keys()][index],
      ts
        .getPreEmitDiagnostics(program, program.getSourceFile(path))
        .map(({ messageText }) =>
          ts.flattenDiagnosticMessageText(messageText, "\n"),
        ),
    ]),
  )
}

let loaded
const load = () => {
  if (!loaded) {
    const program = createProgram()
    const checker = program.getTypeChecker()
    const source = program.getSourceFile(virtualFile)
    const alias = (name) =>
      source.statements.find(
        (statement) =>
          ts.isTypeAliasDeclaration(statement) && statement.name.text === name,
      )
    loaded = {
      cache: new Map(),
      checker,
      components: alias("Components"),
      intrinsic: alias("Intrinsic"),
    }
  }
  return loaded
}

const members = (type) => (type.isUnion() ? type.types : [type])

const kindsOf = (checker, symbol, location) => {
  const kinds = new Set()
  for (const member of members(
    checker.getTypeOfSymbolAtLocation(symbol, location),
  )) {
    const { flags } = member
    if (flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)) continue
    if (flags & ts.TypeFlags.BooleanLike) kinds.add("boolean")
    else if (flags & ts.TypeFlags.NumberLike) kinds.add("number")
    else if (flags & ts.TypeFlags.StringLike) kinds.add("string")
    else if (flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) kinds.add("any")
    else kinds.add("other")
  }
  return kinds
}

const propsOfType = (checker, type, location) => {
  const props = new Map()
  for (const member of members(type)) {
    for (const symbol of checker.getPropertiesOfType(member)) {
      const kinds = kindsOf(checker, symbol, location)
      props.set(
        symbol.name,
        new Set([...(props.get(symbol.name) ?? []), ...kinds]),
      )
    }
  }
  return props
}

export const reactPropsOf = (tag, component) => {
  const state = load()
  const key = `${component ? "component" : "intrinsic"}:${tag}`
  if (!state.cache.has(key)) {
    const { checker } = state
    const location = component ? state.components : state.intrinsic
    const container = checker.getTypeFromTypeNode(location.type)
    const symbol = checker.getPropertyOfType(container, tag)
    let props
    if (symbol) {
      const type = checker.getTypeOfSymbolAtLocation(symbol, location)
      if (!component) {
        props = propsOfType(checker, type, location)
      } else {
        const [signature] = type.getCallSignatures()
        const [parameter] = signature?.parameters ?? []
        if (parameter) {
          props = propsOfType(
            checker,
            checker.getTypeOfSymbolAtLocation(parameter, location),
            location,
          )
        }
      }
    }
    state.cache.set(key, props)
  }
  return state.cache.get(key)
}

export const resolveReactProp = (props, name) => {
  if (props.has(name)) return name
  if (ALIASES[name] && props.has(ALIASES[name])) return ALIASES[name]
  if (name.startsWith("data-")) return name
  const normalized = (text) => text.toLowerCase().replace(/[-:]/g, "")
  const matches = [...props.keys()].filter(
    (candidate) => normalized(candidate) === normalized(name),
  )
  return matches.length === 1 ? matches[0] : undefined
}

export const reactKinds = (props, name) =>
  props.get(name) ??
  (name.startsWith("data-") ? new Set(["string"]) : new Set())
