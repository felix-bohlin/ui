import stylelint from "stylelint"
import { expect, test } from "vitest"

const lint = async (code: string, file = "button.css") => {
  const {
    results: [result],
  } = await stylelint.lint({
    code,
    codeFilename: `packages/opui/css/components/${file}`,
    configFile: "stylelint.config.mjs",
  })
  return result.warnings.map((warning) => warning.rule).toSorted()
}

const block = (body: string) => `:where(.ui-button) {\n${body}\n}\n`

test.each([
  ["declaration-no-important", block("color: CanvasText !important;")],
  ["opui/focus-visible", block("&:focus { outline: 0; }")],
  ["opui/hover-media", block("&:hover { color: CanvasText; }")],
  ["opui/motion-duration", block("transition: opacity 0.2s;")],
  ["opui/motion-duration", block("transition: opacity var(--ui-duration);")],
  [
    "opui/motion-duration",
    block("transition: opacity var(--_duration), color var(--ui-duration);"),
  ],
  ["opui/motion-duration", block("--_duration: var(--ui-duration);")],
  ["opui/state-classes", block("&.ui-button.ui-open { color: CanvasText; }")],
  ["opui/unused-classes", block("& .ui-no-such-part { color: CanvasText; }")],
  [
    "opui/unused-classes",
    "@scope (.ui-no-such-part) {\n  :scope { color: CanvasText; }\n}\n",
  ],
  ["opui/vendor-prefix", block("-webkit-user-select: none;")],
  ["selector-no-vendor-prefix", block("&::-moz-selection { color: Canvas; }")],
])("%s rejects %j", async (rule, code) => {
  expect(await lint(code)).toContain(rule)
})

test.each([
  block("&:focus-visible, &:focus-within { outline: 0; }"),
  block("@media (hover: hover) { &:hover { color: CanvasText; } }"),
  block("transition: opacity var(--_duration) var(--_ease) 0s;"),
  block("animation: ui-spin max(0.7s * var(--_motion), 1s) linear infinite;"),
  block("animation-duration: auto, var(--_focus-ring-duration);"),
  block("--_duration: calc(var(--ui-duration) * var(--_motion));"),
  block("transition: none;"),
  block("&:has(.ui-icon-checked) { color: CanvasText; }"),
  block("-webkit-user-select: none;\nuser-select: none;"),
  block("&::-webkit-slider-thumb { color: CanvasText; }"),
])("accepts %j", async (code) => {
  expect(await lint(code)).toEqual([])
})

test("an exception that no longer matches fails", async () => {
  expect(await lint(block("color: CanvasText;"), "text-field.css")).toEqual([
    "opui/focus-visible",
  ])
})
