import stylelint from "stylelint"
import {
  exceptions,
  exceptOption,
  squash,
  unusedException,
} from "./stylelint-exceptions.mjs"

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = "opui/motion-duration"

const messages = ruleMessages(ruleName, {
  rejected: (property) =>
    `Expected "${property}" to read a --_*duration property (calc(var(--ui-duration) * var(--_motion))) or scale its times by var(--_motion), so --ui-motion and prefers-reduced-motion turn it off`,
  unused: unusedException,
})

const PROPERTIES = new Set([
  "animation",
  "animation-duration",
  "transition",
  "transition-duration",
])

const KEYWORD = /^(inherit|initial|none|revert|revert-layer|unset)$/i
const SCALED = /var\(\s*--(_|ui-)motion\s*\)/i
const READS = /var\(\s*--_[\w-]*duration\s*[,)]/i
const TIME = /(?<![\w.-])(\d+\.?\d*|\.\d+)m?s(?![\w-])/gi

const hasTime = (value) =>
  [...value.matchAll(TIME)].some(([, number]) => Number(number) !== 0)

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

  root.walkDecls((node) => {
    const property = node.prop.toLowerCase()
    if (!PROPERTIES.has(property) || KEYWORD.test(node.value.trim())) return
    if (SCALED.test(node.value)) return
    if (READS.test(node.value) && !hasTime(node.value)) return
    if (except.allows(squash(`${node.prop}: ${node.value}`))) return
    report({
      message: messages.rejected,
      messageArgs: [property],
      node,
      result,
      ruleName,
      word: node.prop,
    })
  })

  except.reportUnused()
}

rule.ruleName = ruleName
rule.messages = messages

export default createPlugin(ruleName, rule)
