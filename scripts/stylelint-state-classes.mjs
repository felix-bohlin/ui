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

const ruleName = "opui/state-classes"

const messages = ruleMessages(ruleName, {
  rejected: (name, native) =>
    `Expected ${native} instead of the state class ".${name}": states come from native attributes and pseudo-classes`,
  unused: unusedException,
})

const NATIVE = {
  active: ":active",
  busy: '[aria-busy="true"]',
  checked: ':checked or [aria-checked="true"]',
  closed: ":not([open])",
  collapsed: ':not([open]) or [aria-expanded="false"]',
  current: "[aria-current]",
  disabled: ':disabled or [aria-disabled="true"]',
  expanded: '[open] or [aria-expanded="true"]',
  focus: ":focus-visible",
  focused: ":focus-visible",
  hidden: "[hidden]",
  hover: ":hover",
  hovered: ":hover",
  indeterminate: ":indeterminate",
  invalid: ':user-invalid or [aria-invalid="true"]',
  loading: '[aria-busy="true"]',
  open: "[open], :popover-open or :modal",
  opened: "[open], :popover-open or :modal",
  pressed: '[aria-pressed="true"]',
  readonly: ":read-only",
  required: ":required",
  selected: ':checked or [aria-selected="true"]',
  valid: ":user-valid",
  visited: ":visited",
}

const STATE = new RegExp(
  `\\.(ui-(${Object.keys(NATIVE).join("|")}))(?![\\w-])`,
  "g",
)

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
      const found = [...selector.matchAll(STATE)]
      if (found.length === 0 || except.allows(selector)) continue
      for (const [word, name, state] of found) {
        report({
          message: messages.rejected,
          messageArgs: [name, NATIVE[state]],
          node,
          result,
          ruleName,
          word,
        })
      }
    }
  })

  except.reportUnused()
}

rule.ruleName = ruleName
rule.messages = messages

export default createPlugin(ruleName, rule)
