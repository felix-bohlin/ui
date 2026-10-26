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
    `Expected each entry of "${property}" to read a --_*duration property (calc(var(--ui-duration) * var(--_motion))) or scale its times by var(--_motion), so --ui-motion and prefers-reduced-motion turn it off`,
  unscaled: (property) =>
    `Expected "${property}" to scale by var(--_motion) or read another --_*duration property, so --ui-motion and prefers-reduced-motion turn it off`,
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

const DEFINITION = /^--_[\w-]*duration$/i
const UNSCALED = /var\(\s*--ui-duration/i

const hasTime = (value) =>
  [...value.matchAll(TIME)].some(([, number]) => Number(number) !== 0)

const entries = (value) => {
  const list = [""]
  let depth = 0
  for (const char of value) {
    if (char === "(") depth++
    if (char === ")") depth--
    if (char === "," && depth === 0) list.push("")
    else list[list.length - 1] += char
  }
  return list.map((entry) => entry.trim())
}

const scaled = (entry) =>
  SCALED.test(entry) || (!hasTime(entry) && !UNSCALED.test(entry))

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
    const definition = DEFINITION.test(node.prop)
    if (!definition && !PROPERTIES.has(property)) return
    if (KEYWORD.test(node.value.trim())) return
    if (
      definition
        ? SCALED.test(node.value) || READS.test(node.value)
        : entries(node.value).every(scaled)
    ) {
      return
    }
    if (except.allows(squash(`${node.prop}: ${node.value}`))) return
    report({
      message: definition ? messages.unscaled : messages.rejected,
      messageArgs: [node.prop],
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
