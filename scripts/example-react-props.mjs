import { readdirSync, readFileSync } from "node:fs"
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
const solidFile = join(root, "src/component-examples/solid-props.tsx")
const solidSource = `import type { JSX } from "@solidjs/web"
import * as ui from "opui-css/solid"
import "../../packages/opui/solid/elements"
export type Intrinsic = JSX.IntrinsicElements
export type Components = typeof ui
`

export const REACT_ATTRIBUTE_NAMES = {
  autocomplete: "autoComplete",
  class: "className",
  for: "htmlFor",
}

const compilerOptions = () =>
  ts.parseJsonConfigFileContent(
    {
      compilerOptions: {
        jsx: "preserve",
        lib: ["esnext", "dom", "dom.iterable"],
        module: "esnext",
        moduleResolution: "bundler",
        noEmit: true,
        paths: {
          "opui-css/react": ["./packages/opui/react/index.ts"],
          "opui-css/solid": ["./packages/opui/solid/index.ts"],
        },
        skipLibCheck: true,
        strict: true,
        target: "esnext",
        types: [],
      },
    },
    ts.sys,
    root,
  ).options

const createProgram = (files = new Map(), frameworks = true) => {
  const options = compilerOptions()
  const sources = new Map([
    ...(frameworks
      ? [
          [virtualFile, virtualSource],
          [solidFile, solidSource],
        ]
      : []),
    ...files,
  ])
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

let shared
const loaded = new Map()
const load = (framework = "react") => {
  if (!loaded.has(framework)) {
    shared ??= createProgram()
    const checker = shared.getTypeChecker()
    const source = shared.getSourceFile(
      framework === "solid" ? solidFile : virtualFile,
    )
    const alias = (name) =>
      source.statements.find(
        (statement) =>
          ts.isTypeAliasDeclaration(statement) && statement.name.text === name,
      )
    loaded.set(framework, {
      cache: new Map(),
      checker,
      components: alias("Components"),
      intrinsic: alias("Intrinsic"),
    })
  }
  return loaded.get(framework)
}

const members = (type) => (type.isUnion() ? type.types : [type])

const kindsOf = (checker, symbol, location) => {
  const kinds = new Set()
  const all = members(checker.getTypeOfSymbolAtLocation(symbol, location))
  const allowsTrue = all.some(
    (member) =>
      member.flags & ts.TypeFlags.BooleanLike &&
      checker.typeToString(member) !== "false",
  )
  for (const member of all) {
    const { flags } = member
    if (flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)) continue
    if (flags & ts.TypeFlags.BooleanLike) {
      if (allowsTrue) kinds.add("boolean")
    } else if (flags & ts.TypeFlags.NumberLike) kinds.add("number")
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

export const propsOf = (framework, tag, component) => {
  const state = load(framework)
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

export const reactPropsOf = (tag, component) => propsOf("react", tag, component)

export const resolveReactProp = (props, name) => {
  if (props.has(name)) return name
  if (REACT_ATTRIBUTE_NAMES[name] && props.has(REACT_ATTRIBUTE_NAMES[name])) {
    return REACT_ATTRIBUTE_NAMES[name]
  }
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

export const reactAttributeName = (tag, name) =>
  REACT_ATTRIBUTE_NAMES[name] ??
  (tag
    ? resolveReactProp(reactPropsOf(tag, false) ?? new Map(), name)
    : undefined) ??
  name

export const reactBareAttribute = (name, kinds) =>
  ["any", "boolean", "other"].some((kind) => kinds.has(kind))
    ? name
    : kinds.has("string")
      ? `${name}=""`
      : undefined

const astroFile = join(root, "src/component-examples/astro-props.ts")

export const exportedTypes = (source) =>
  ts
    .createSourceFile("types.astro.ts", source, ts.ScriptTarget.Latest)
    .statements.flatMap((statement) =>
      ts.isTypeAliasDeclaration(statement) &&
      statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      ) &&
      !statement.typeParameters?.some((parameter) => !parameter.default)
        ? [statement.name.text]
        : ts.isExportDeclaration(statement) &&
            statement.exportClause &&
            ts.isNamedExports(statement.exportClause)
          ? statement.exportClause.elements.map((element) => element.name.text)
          : [],
    )

const astroSource = () => {
  const componentsDir = join(root, "packages/opui/components")
  const entries = readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted()
    .flatMap((folder) => {
      let source
      try {
        source = readFileSync(
          join(componentsDir, folder, "types.astro.ts"),
          "utf8",
        )
      } catch {
        return []
      }
      return exportedTypes(source).map((name) => ({ folder, name }))
    })
  return [
    ...[...new Set(entries.map(({ folder }) => folder))].map(
      (folder) =>
        `import type * as ${folder} from "../../packages/opui/components/${folder}/types.astro"`,
    ),
    `export type Props = {`,
    ...entries.map(
      ({ folder, name }) =>
        `  ${JSON.stringify(`${folder}/${name}`)}: ${folder}.${name}`,
    ),
    "}",
  ].join("\n")
}

let astro

const shapeOf = (checker, symbol, location) => {
  const parts = members(checker.getTypeOfSymbolAtLocation(symbol, location))
  const fields = new Map()
  for (const list of parts.filter((type) => checker.isArrayType(type))) {
    for (const item of members(checker.getTypeArguments(list)[0])) {
      for (const field of checker.getPropertiesOfType(item)) {
        fields.set(
          field.name,
          new Set([
            ...(fields.get(field.name) ?? []),
            ...kindsOf(checker, field, location),
          ]),
        )
      }
    }
  }
  return {
    fields,
    kinds: kindsOf(checker, symbol, location),
    nullable: parts.some((type) => type.flags & ts.TypeFlags.Null),
  }
}

const merged = (known, shape) =>
  known
    ? {
        fields: new Map(
          [...new Set([...known.fields.keys(), ...shape.fields.keys()])].map(
            (name) => [
              name,
              new Set([
                ...(known.fields.get(name) ?? []),
                ...(shape.fields.get(name) ?? []),
              ]),
            ],
          ),
        ),
        kinds: new Set([...known.kinds, ...shape.kinds]),
        nullable: known.nullable || shape.nullable,
      }
    : shape

const typeProgram = (file, source, alias) => {
  const program = createProgram(new Map([[file, source]]), false)
  const location = program
    .getSourceFile(file)
    .statements.find(
      (statement) =>
        ts.isTypeAliasDeclaration(statement) && statement.name.text === alias,
    )
  const checker = program.getTypeChecker()
  return {
    checker,
    container: checker.getTypeFromTypeNode(location.type),
    location,
  }
}

export const astroPropsOf = (folder, propsType) => {
  astro ??= {
    cache: new Map(),
    ...typeProgram(astroFile, astroSource(), "Props"),
  }
  const key = `${folder}/${propsType}`
  if (!astro.cache.has(key)) {
    const { checker, container, location } = astro
    const symbol = checker.getPropertyOfType(container, key)
    let props
    if (symbol) {
      props = new Map()
      for (const member of members(
        checker.getTypeOfSymbolAtLocation(symbol, location),
      )) {
        for (const property of checker.getPropertiesOfType(member)) {
          props.set(
            property.name,
            merged(
              props.get(property.name),
              shapeOf(checker, property, location),
            ),
          )
        }
      }
    }
    astro.cache.set(key, props)
  }
  return astro.cache.get(key)
}

const returnsFile = join(root, "src/component-examples/helper-returns.ts")

const returnsCache = new Map()

export const helperReturnsOf = (entries) => {
  const key = JSON.stringify(entries)
  if (!returnsCache.has(key)) {
    const modules = [...new Set(entries.map(({ file }) => file))].toSorted()
    const source = [
      ...modules.map(
        (file, index) =>
          `import type * as m${index} from "../../packages/opui/components/${file.replace(/\.ts$/, "")}"`,
      ),
      "export type Returns = {",
      ...entries.map(
        ({ file, name }) =>
          `  ${JSON.stringify(name)}: ReturnType<typeof m${modules.indexOf(file)}.${name}>`,
      ),
      "}",
    ].join("\n")
    const { checker, container, location } = typeProgram(
      returnsFile,
      source,
      "Returns",
    )
    returnsCache.set(
      key,
      new Map(
        checker
          .getPropertiesOfType(container)
          .map((symbol) => [symbol.name, shapeOf(checker, symbol, location)]),
      ),
    )
  }
  return returnsCache.get(key)
}
