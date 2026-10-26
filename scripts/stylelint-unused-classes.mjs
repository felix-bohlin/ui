import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import stylelint from "stylelint"

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = "opui/unused-classes"

const SOURCES = ["packages/opui/components", "packages/opui/css/js", "src"]

const messages = ruleMessages(ruleName, {
  rejected: (name) =>
    `Expected ".${name}" to be used outside the CSS, by a component, an example, api.ts or the docs site (${SOURCES.join(", ")}): remove the dead selector`,
})

const repo = fileURLToPath(new URL("..", import.meta.url))
const TEXT = /\.(astro|html|js|json|md|mdx|mjs|svelte|ts|tsx|vue)$/

let sources
const usage = () => {
  sources ??= SOURCES.flatMap((dir) =>
    readdirSync(join(repo, dir), { recursive: true })
      .filter((file) => TEXT.test(file))
      .map((file) => readFileSync(join(repo, dir, file), "utf8")),
  ).join("\n")
  return sources
}

const used = new Map()
const isUsed = (name) => {
  if (!used.has(name)) {
    used.set(name, new RegExp(`(?<![\\w-])${name}(?![\\w-])`).test(usage()))
  }
  return used.get(name)
}

const rule = (primary) => (root, result) => {
  if (!validateOptions(result, ruleName, { actual: primary })) return

  const reported = new Set()
  const check = (node, text) => {
    for (const [word, name] of text.matchAll(/\.(ui-[\w-]+)/g)) {
      if (reported.has(name) || isUsed(name)) continue
      reported.add(name)
      report({
        message: messages.rejected,
        messageArgs: [name],
        node,
        result,
        ruleName,
        word,
      })
    }
  }

  root.walkRules((node) => check(node, node.selector))
  root.walkAtRules("scope", (node) => check(node, node.params))
}

rule.ruleName = ruleName
rule.messages = messages

export default createPlugin(ruleName, rule)
