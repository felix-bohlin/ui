import { readFileSync } from "node:fs"
import vm from "node:vm"

export type FakeAlias = { id: string; type: "VARIABLE_ALIAS" }

export type FakeVariable = {
  codeSyntax: Record<string, string>
  description: string
  hiddenFromPublishing: boolean
  id: string
  name: string
  resolvedType: string
  scopes: string[]
  setValueForMode: (modeId: string, value: unknown) => void
  setVariableCodeSyntax: (platform: string, value: string) => void
  valuesByMode: Record<string, unknown>
  variableCollectionId: string
}

export type FakeCollection = {
  addMode: (name: string) => string
  id: string
  modes: { modeId: string; name: string }[]
  name: string
  remove: () => void
  removeMode: (modeId: string) => void
  renameMode: (modeId: string, name: string) => void
  variableIds: string[]
}

export type FakeEffect = Record<string, unknown> & {
  boundVariables?: Record<string, FakeAlias>
}

export type FakeEffectStyle = {
  description: string
  effects: FakeEffect[]
  id: string
  name: string
}

export type FakeTextStyle = {
  boundVariables: Record<string, FakeAlias>
  description: string
  fontName: { family: string; style: string }
  fontSize: number
  id: string
  letterSpacing: unknown
  lineHeight: unknown
  name: string
  setBoundVariable: (field: string, variable: FakeVariable) => void
  textCase: string
}

export const FONTS: [string, string[]][] = [
  ["Inconsolata", ["Regular", "Bold"]],
  ["Inter", ["Regular", "Medium", "Semi Bold", "Bold"]],
  ["Roboto Mono", ["Regular", "Bold"]],
]

export const fakeFigma = ({
  fonts = FONTS,
  modeLimit = 40,
  profile = "SRGB",
  types = ["BOOLEAN", "COLOR", "EASING", "FLOAT", "STRING", "TIMING"],
} = {}) => {
  let next = 1
  const id = (prefix: string) => `${prefix}:${next++}`
  const alias = (variable: FakeVariable): FakeAlias => ({
    id: variable.id,
    type: "VARIABLE_ALIAS",
  })
  const collections: FakeCollection[] = []
  const variables: FakeVariable[] = []
  const effectStyles: FakeEffectStyle[] = []
  const textStyles: FakeTextStyle[] = []
  const loaded: { family: string; style: string }[] = []
  const figma = {
    createEffectStyle: () => {
      const style = { description: "", effects: [], id: id("S"), name: "" }
      effectStyles.push(style)
      return style
    },
    createTextStyle: () => {
      const style: FakeTextStyle = {
        boundVariables: {},
        description: "",
        fontName: { family: "Inter", style: "Regular" },
        fontSize: 12,
        id: id("S"),
        letterSpacing: undefined,
        lineHeight: undefined,
        name: "",
        setBoundVariable: (field, variable) => {
          style.boundVariables[field] = alias(variable)
        },
        textCase: "ORIGINAL",
      }
      textStyles.push(style)
      return style
    },
    getLocalEffectStylesAsync: async () => [...effectStyles],
    getLocalTextStylesAsync: async () => [...textStyles],
    listAvailableFontsAsync: async () =>
      fonts.flatMap(([family, styles]) =>
        styles.map((style) => ({ fontName: { family, style } })),
      ),
    loadFontAsync: async (font: { family: string; style: string }) => {
      loaded.push(font)
    },
    root: { documentColorProfile: profile },
    variables: {
      createVariable: (
        name: string,
        collection: FakeCollection,
        type: string,
      ) => {
        if (!types.includes(type)) throw new Error(`Unknown type ${type}`)
        const variable: FakeVariable = {
          codeSyntax: {},
          description: "",
          hiddenFromPublishing: false,
          id: id("V"),
          name,
          resolvedType: type,
          scopes: ["ALL_SCOPES"],
          setValueForMode: (modeId, value) => {
            variable.valuesByMode[modeId] = value
          },
          setVariableCodeSyntax: (platform, value) => {
            variable.codeSyntax[platform] = value
          },
          valuesByMode: {},
          variableCollectionId: collection.id,
        }
        collection.variableIds.push(variable.id)
        variables.push(variable)
        return variable
      },
      createVariableAlias: alias,
      createVariableCollection: (name: string) => {
        const collection: FakeCollection = {
          addMode: (mode) => {
            if (collection.modes.length >= modeLimit) {
              throw new Error(`in addMode: Limited to ${modeLimit} modes only`)
            }
            const modeId = id("M")
            collection.modes.push({ modeId, name: mode })
            return modeId
          },
          id: id("C"),
          modes: [{ modeId: id("M"), name: "Mode 1" }],
          name,
          remove: () => {
            collections.splice(collections.indexOf(collection), 1)
          },
          removeMode: (modeId) => {
            collection.modes = collection.modes.filter(
              (candidate) => candidate.modeId !== modeId,
            )
          },
          renameMode: (modeId, mode) => {
            const entry = collection.modes.find(
              (candidate) => candidate.modeId === modeId,
            )
            if (entry) entry.name = mode
          },
          variableIds: [],
        }
        collections.push(collection)
        return collection
      },
      getLocalVariableCollectionsAsync: async () => [...collections],
      getLocalVariablesAsync: async () => [...variables],
      setBoundVariableForEffect: (
        effect: FakeEffect,
        field: string,
        variable: FakeVariable,
      ) => ({
        ...effect,
        boundVariables: { ...effect.boundVariables, [field]: alias(variable) },
      }),
    },
  }
  return { collections, effectStyles, figma, loaded, textStyles, variables }
}

export const SYNC_SOURCE = readFileSync("packages/opui/figma/sync.js", "utf8")

export const runSync = (
  figma: unknown,
  theme: unknown,
  options?: Record<string, unknown>,
) => {
  const context = vm.createContext({ figma })
  vm.runInContext(SYNC_SOURCE, context)
  return vm.runInContext("opuiFigmaSync", context)(theme, options) as Promise<{
    collections: { id: string; modes: string[]; name: string }[]
    effectStyles: { id: string; name: string }[]
    textStyles: { id: string; name: string }[]
    variables: { created: number; updated: number }
    warnings: string[]
  }>
}
