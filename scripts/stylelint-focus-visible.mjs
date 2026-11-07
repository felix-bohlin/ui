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

const ruleName = "opui/focus-visible"

const messages = ruleMessages(ruleName, {
  rejected: (selector) =>
    `Expected ":focus-visible" or ":focus-within" instead of ":focus" in "${selector}", so a mouse click doesn't show the focus style`,
  unused: unusedException,
})

const FOCUS = /:focus(?![\w-])/i

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
    for (const selector of node.selectors) {
      if (!FOCUS.test(selector) || except.allows(selector)) continue
      report({
        message: messages.rejected,
        messageArgs: [selector],
        node,
        result,
        ruleName,
        word: ":focus",
      })
    }
  })

  except.reportUnused()
}

rule.ruleName = ruleName
rule.messages = messages

export default createPlugin(ruleName, rule)
