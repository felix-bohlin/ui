import ts from "typescript"
import { byName, sourceFileOf } from "./component-shared.mjs"

export const fragment = (code, needs = {}) => ({
  code,
  declarations: needs.declarations ?? [],
  imports: needs.imports ?? [],
  slots: needs.slots ?? [],
})

const NONE = fragment("")

export const asFragment = (part) =>
  part === undefined ? NONE : typeof part === "string" ? fragment(part) : part

export const needsOf = (parts) => {
  const fragments = parts.map(asFragment)
  return {
    declarations: fragments.flatMap((part) => part.declarations),
    imports: fragments.flatMap((part) => part.imports),
    slots: fragments.flatMap((part) => part.slots),
  }
}

export const join = (parts, separator = "") =>
  fragment(
    parts.map((part) => asFragment(part).code).join(separator),
    needsOf(parts),
  )

export const code = (strings, ...parts) =>
  fragment(
    strings.reduce(
      (text, string, index) =>
        text + asFragment(parts[index - 1]).code + string,
    ),
    needsOf(parts),
  )

export const arrowBody = (part) =>
  asFragment(part).code.trimStart().startsWith("{")
    ? code`(${part})`
    : asFragment(part)

export const named = (module, name) => ({ module, name })

export const typed = (module, name) => ({ module, name, type: true })

export const uses = (part, ...imports) => {
  const used = asFragment(part)
  return { ...used, imports: [...used.imports, ...imports] }
}

export const reads = (text, ...declarations) => fragment(text, { declarations })

export const declaration = (name, part) => ({
  ...asFragment(part),
  declares: name,
})

export const declaredIn = (parts) =>
  parts.flatMap((part) => (part.declares === undefined ? [] : [part.declares]))

export const needed = (roots, declarations) => {
  const byDeclared = new Map(declarations.map((part) => [part.declares, part]))
  const kept = new Set()
  const visit = (part) => {
    for (const name of part.declarations) {
      const found = byDeclared.get(name)
      if (found && !kept.has(found)) {
        kept.add(found)
        visit(found)
      }
    }
  }
  roots.map(asFragment).forEach(visit)
  return declarations.filter((part) => kept.has(part))
}

export const slotReads = (parts, inScope) => {
  const counts = new Map()
  for (const { scope, slot } of needsOf(parts).slots) {
    if (inScope(scope)) counts.set(slot, (counts.get(slot) ?? 0) + 1)
  }
  return counts
}

const namedImport = (line) => {
  const [statement] = sourceFileOf(line, "import.ts").statements
  return statement &&
    ts.isImportDeclaration(statement) &&
    !statement.importClause?.isTypeOnly &&
    !statement.importClause?.name &&
    statement.importClause?.namedBindings &&
    ts.isNamedImports(statement.importClause.namedBindings)
    ? {
        module: statement.moduleSpecifier.text,
        names: statement.importClause.namedBindings.elements.map((element) =>
          element.getText(),
        ),
      }
    : undefined
}

const withImport = (lines, module, name) => {
  const imports = lines.map(namedImport)
  const index = imports.findIndex((entry) => entry?.module === module)
  if (index === -1) return [...lines, `import { ${name} } from "${module}"`]
  const names = [...new Set([...imports[index].names, name])].toSorted(byName)
  return lines.with(index, `import { ${names.join(", ")} } from "${module}"`)
}

const importText = (module, entries, { typeOnly = true } = {}) => {
  const types = typeOnly && entries.every((entry) => entry.type)
  const names = entries.map(({ name, type }) =>
    type && !types ? `type ${name}` : name,
  )
  return `import ${types ? "type " : ""}{ ${names.join(", ")} } from "${module}"`
}

export const importsOf = (parts) => {
  const byModule = new Map()
  for (const entry of needsOf(parts).imports) {
    const entries = byModule.get(entry.module) ?? new Map()
    const known = entries.get(entry.name)
    entries.set(entry.name, {
      ...entry,
      type: !!entry.type && (known === undefined || !!known.type),
    })
    byModule.set(entry.module, entries)
  }
  const entriesOf = (module) =>
    [...(byModule.get(module)?.values() ?? [])].toSorted((a, b) =>
      byName(a.name, b.name),
    )
  const taken = new Set()
  const take = (module) => {
    if (taken.has(module)) return []
    taken.add(module)
    return entriesOf(module)
  }
  return {
    has: (module, name) => byModule.get(module)?.has(name) ?? false,
    line: (module, options) => {
      const entries = take(module)
      return entries.length ? [importText(module, entries, options)] : []
    },
    merged: (lines, modules) =>
      modules.reduce(
        (merged, module) =>
          take(module).reduce(
            (into, { name }) => withImport(into, module, name),
            merged,
          ),
        lines,
      ),
    rest: (except = []) => {
      const modules = [...byModule.keys()]
        .filter((module) => !taken.has(module) && !except.includes(module))
        .map((module) => [module, entriesOf(module)[0].name])
        .toSorted(([, a], [, b]) => byName(a, b))
        .map(([module]) => module)
      return modules.flatMap((module) => [importText(module, take(module))])
    },
  }
}
