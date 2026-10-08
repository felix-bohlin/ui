import stylelint from "stylelint"

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = "opui/logical-shorthands"

const messages = ruleMessages(ruleName, {
  rejected: (property, longhands) =>
    `Expected "${property}" with more than one value to be written as ${longhands}`,
})

const longhands = {
  "border-color": '"border-block-color" and "border-inline-color"',
  "border-radius":
    '"border-start-start-radius", "border-start-end-radius", "border-end-start-radius" and "border-end-end-radius"',
  "border-style": '"border-block-style" and "border-inline-style"',
  "border-width": '"border-block-width" and "border-inline-width"',
  inset: '"inset-block" and "inset-inline"',
  margin: '"margin-block" and "margin-inline"',
  overflow: '"overflow-block" and "overflow-inline"',
  "overscroll-behavior":
    '"overscroll-behavior-block" and "overscroll-behavior-inline"',
  padding: '"padding-block" and "padding-inline"',
  "scroll-margin": '"scroll-margin-block" and "scroll-margin-inline"',
  "scroll-padding": '"scroll-padding-block" and "scroll-padding-inline"',
}

const hasManyValues = (value) => {
  let count = 0
  let depth = 0
  let current = ""
  for (const char of `${value} `) {
    if (char === "(") depth++
    if (char === ")") depth--
    if (depth === 0 && (char === "/" || /\s/.test(char))) {
      if (current) count++
      if (count > 1) return true
      if (char === "/") count = 0
      current = ""
    } else {
      current += char
    }
  }
  return false
}

const rule = (primary) => (root, result) => {
  if (!validateOptions(result, ruleName, { actual: primary })) return

  root.walkDecls((decl) => {
    const property = decl.prop.toLowerCase()
    if (!Object.hasOwn(longhands, property)) return
    if (!hasManyValues(decl.value.replace(/!\s*important\s*$/i, "").trim()))
      return

    report({
      message: messages.rejected,
      messageArgs: [property, longhands[property]],
      node: decl,
      result,
      ruleName,
      word: decl.prop,
    })
  })
}

rule.ruleName = ruleName
rule.messages = messages

export default createPlugin(ruleName, rule)
