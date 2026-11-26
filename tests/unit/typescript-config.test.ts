import ts from "typescript"
import { describe, expect, test } from "vitest"

const repoOptions = () => {
  const { config } = ts.readConfigFile("tsconfig.json", ts.sys.readFile)
  return ts.parseJsonConfigFileContent(config, ts.sys, process.cwd()).options
}

const refusals = (code: string, options: ts.CompilerOptions) => {
  const file = "/sample.ts"
  const host = ts.createCompilerHost(options)
  const readFile = host.readFile
  host.fileExists = (name) => name === file || ts.sys.fileExists(name)
  host.readFile = (name) => (name === file ? code : readFile(name))
  const program = ts.createProgram([file], { ...options, noEmit: true }, host)
  return [
    ...program.getSyntacticDiagnostics(),
    ...program.getSemanticDiagnostics(),
  ]
    .filter((diagnostic) => diagnostic.file?.fileName === file)
    .map((diagnostic) => diagnostic.code)
}

describe("the TypeScript config", () => {
  test("refuses an enum, so a set of values is an object literal with as const or a union of string literals", () => {
    expect(
      repoOptions().erasableSyntaxOnly,
      "tsconfig.json sets erasableSyntaxOnly, which refuses enum and the other syntax Node's type stripping can't run: write a set of values as an object literal with as const, or a union of string literals",
    ).toBe(true)
  })

  test("a sample the option must flag: an enum, and not an object literal with as const", () => {
    const options = { ...repoOptions(), erasableSyntaxOnly: true }
    expect(
      refusals('export enum Size { Small = "small" }\n', options),
    ).toContain(1294)
    expect(
      refusals('export const SIZE = { small: "small" } as const\n', options),
    ).toEqual([])
  })
})
