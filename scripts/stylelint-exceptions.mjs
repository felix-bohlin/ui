import stylelint from "stylelint"

const {
  utils: { report },
} = stylelint

export const exceptOption = {
  except: [(entry) => typeof entry === "string"],
}

export const unusedException = (entry) =>
  `Expected "${entry}" to occur in this file: remove it from the rule's "except" list in stylelint.config.mjs`

export const squash = (text) => text.replace(/\s+/g, " ").trim()

export const exceptions = (secondary, { messages, result, root, ruleName }) => {
  const entries = new Set(secondary?.except)
  const unused = new Set(entries)
  return {
    allows: (text) => {
      unused.delete(squash(text))
      return entries.has(squash(text))
    },
    reportUnused: () => {
      for (const entry of unused) {
        report({
          message: messages.unused,
          messageArgs: [entry],
          node: root,
          result,
          ruleName,
        })
      }
    },
  }
}
