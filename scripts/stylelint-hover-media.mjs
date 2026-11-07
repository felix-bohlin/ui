import stylelint from "stylelint"
import {
  exceptions,
  exceptOption,
  unusedException,
} from "./stylelint-exceptions.mjs"

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = "opui/hover-media"

const messages = ruleMessages(ruleName, {
  rejected: (selector) =>
    `Expected "${selector}" inside @media (hover: hover), so a tap on a touch screen doesn't leave the hover style on`,
  unused: unusedException,
})

const HOVER = /:hover(?![\w-])/i

const inHoverMedia = (node) => {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (
      parent.type === "atrule" &&
      parent.name.toLowerCase() === "media" &&
      /\(\s*hover\s*:\s*hover\s*\)/i.test(parent.params) &&
      !/\bnot\b/i.test(parent.params)
    ) {
      return true
    }
  }
  return false
}

const rule = (primary, secondary) => (root, result) => {
  if (
    !validateOptions(
      result,
      ruleName,
      { actual: primary },
      { actual: secondary, optional: true, possible: exceptOption },
    )
  ) {
    return
  }

  const except = exceptions(secondary, { messages, result, root, ruleName })

  root.walkRules((node) => {
    if (inHoverMedia(node)) return
    for (const selector of node.selectors) {
      if (!HOVER.test(selector) || except.allows(selector)) continue
      report({
        message: messages.rejected,
        messageArgs: [selector],
        node,
        result,
        ruleName,
        word: ":hover",
      })
    }
  })

  except.reportUnused()
}

rule.ruleName = ruleName
rule.messages = messages

export default createPlugin(ruleName, rule)
