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

const ruleName = "opui/disabled-pseudo"

const messages = ruleMessages(ruleName, {
  rejected: (word) =>
    `Expected ":disabled" instead of "${word}": the pseudo-class also matches a control in a disabled fieldset. Pair it with [aria-disabled="true"] where the author-managed state should look the same`,
  unused: unusedException,
})

const ATTRIBUTE = /\[\s*disabled\s*(?:[~|^$*]?=\s*[^\]]*)?\]/g

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

  const check = (node, selectors) => {
    for (const selector of selectors) {
      const found = [...selector.matchAll(ATTRIBUTE)]
      if (found.length === 0 || except.allows(selector)) continue
      for (const [word] of found) {
        report({
          message: messages.rejected,
          messageArgs: [word],
          node,
          result,
          ruleName,
          word,
        })
      }
    }
  }

  root.walkRules((node) => check(node, node.selectors))
  root.walkAtRules("scope", (node) => check(node, [node.params]))

  except.reportUnused()
}

rule.ruleName = ruleName
rule.messages = messages

export default createPlugin(ruleName, rule)
