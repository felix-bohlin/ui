import { globSync, readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"

import { checkHtml } from "../../packages/opui/bin/check.mjs"

const ROOTS = ["ui-field", "ui-one-time-code"]

const wiringProblems = (html: string) =>
  checkHtml(html).problems.map(({ message }) => message)

const FILES = globSync("src/{blocks,component-examples}/*/*.html").toSorted()

describe("every field in the HTML examples and blocks points at the control you write", () => {
  test("covers the files with a text field", () => {
    expect(
      FILES.filter((file) =>
        ROOTS.some((root) => readFileSync(file, "utf8").includes(root)),
      ).length,
    ).toBeGreaterThan(20)
  })

  test.each(FILES)("%s", (file) => {
    expect(wiringProblems(readFileSync(file, "utf8"))).toEqual([])
  })

  test("a sample the check must flag: a part the input doesn't point at, a wrong part id and a label pointing elsewhere", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="y">Name</label><span class="ui-field-container"><input id="x" aria-describedby="x-end-text"><span class="ui-end" id="z">kg</span></span><span class="ui-start-text" id="x-start-text">Hint</span><span class="ui-end-text" id="x-end-text">Error</span></div>',
      ),
    ).toEqual([
      '#x: the label\'s for is "y", not "x"',
      '#x: .ui-end has the id "z", not "x-end"',
      '#x: aria-describedby lists "x-end-text", not "x-start-text x-end x-end-text"',
    ])
  })

  test("a sample the check must flag: no input in the field", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><span class="ui-field-container"><span><input id="x"></span></span></div>',
      ),
    ).toEqual([
      ".ui-field: no <input>, <select> or <textarea> with an id directly in .ui-field-container",
    ])
  })

  test("start and end parts that only hold step buttons stay out of the description", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Quantity</label><span class="ui-field-container"><span class="ui-start" id="x-start"><opui-step-button><button command="--step-down" commandfor="x"></button></opui-step-button></span><input id="x" type="number"><span class="ui-end" id="x-end"><opui-step-button><button command="--step-up" commandfor="x"></button></opui-step-button></span></span></div>',
      ),
    ).toEqual([])
  })

  test("an end text that only holds the value output stays out of the description", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Hue</label><span class="ui-field-container"><input id="x" type="range"></span><span class="ui-end-text" id="x-end-text"><output for="x">250</output></span></div>',
      ),
    ).toEqual([])
  })

  test("an end part that only holds a button stays out of the description", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Reply</label><span class="ui-field-container"><textarea id="x"></textarea><span class="ui-end" id="x-end"><button class="ui-button" type="submit">Send</button></span></span></div>',
      ),
    ).toEqual([])
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Price</label><span class="ui-field-container"><input id="x"><span class="ui-end" id="x-end">EUR</span></span></div>',
      ),
    ).toEqual(['#x: aria-describedby lists no part, not "x-end"'])
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Price</label><span class="ui-field-container"><input id="x"><span class="ui-end" id="x-end">EUR<button class="ui-button" type="button">Convert</button></span></span></div>',
      ),
    ).toEqual(['#x: aria-describedby lists no part, not "x-end"'])
  })

  test("a part that only holds a hidden icon stays out of the description", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Search</label><span class="ui-field-container"><span class="ui-start" id="x-start"><svg aria-hidden="true"><path d="M0 0"></path></svg></span><input aria-describedby="x-start" id="x"></span></div>',
      ),
    ).toEqual(['#x: aria-describedby lists "x-start", not no part'])
  })

  test("a sample the check must flag: a step button that acts on another control", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Quantity</label><span class="ui-field-container"><span class="ui-start" id="x-start"><opui-step-button><button command="--step-down" commandfor="y"></button></opui-step-button></span><input id="x" type="number"></span></div>',
      ),
    ).toEqual([
      '#x: the <opui-step-button> button\'s commandfor is "y", not "x"',
    ])
  })

  test("counts the fields and gives each problem the line its field starts on", () => {
    expect(
      checkHtml(
        '<!doctype html>\n<p>Order</p>\n<div class="ui-field"><label class="ui-label" for="y">Name</label><span class="ui-field-container"><input id="x"></span></div>',
      ),
    ).toEqual({
      fields: 1,
      problems: [{ line: 3, message: '#x: the label\'s for is "y", not "x"' }],
    })
  })

  test("an end part that only holds a password toggle stays out of the description", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Password</label><span class="ui-field-container"><input id="x" type="password"><span class="ui-end" id="x-end"><opui-password-toggle><button command="--toggle-password" commandfor="x"></button></opui-password-toggle></span></span></div>',
      ),
    ).toEqual([])
  })
})
