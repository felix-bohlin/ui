import stylelint from "stylelint"

const {
  createPlugin,
  utils: { checkAgainstRule, report, ruleMessages, validateOptions },
} = stylelint

const ruleName = "opui/vendor-prefix"

const messages = ruleMessages(ruleName, {
  rejected: (prefixed, standard) =>
    `Expected "${standard}" with the same value next to "${prefixed}": a prefixed property is only a zero-cost fallback for its standard one (Browser support in AGENTS.md)`,
})

const rule = (primary) => async (root, result) => {
  if (!validateOptions(result, ruleName, { actual: primary })) return

  await checkAgainstRule(
    { result, root, ruleName: "property-no-vendor-prefix", ruleSettings: true },
    ({ node }) => {
      const standard = node.prop.toLowerCase().replace(/^-[a-z]+-/, "")
      const twin = node.parent.nodes.some(
        (sibling) =>
          sibling.type === "decl" &&
          sibling.prop.toLowerCase() === standard &&
          sibling.value === node.value,
      )
      if (twin) return
      report({
        message: messages.rejected,
        messageArgs: [node.prop, standard],
        node,
        result,
        ruleName,
        word: node.prop,
      })
    },
  )
}

rule.ruleName = ruleName
rule.messages = messages

export default createPlugin(ruleName, rule)
