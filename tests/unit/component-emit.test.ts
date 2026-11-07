import { describe, expect, test } from "vitest"
import {
  rewriteExpression,
  rewriteStatement,
} from "../../scripts/component-emit.mjs"

const rename = new Map([
  ["item", "props.item"],
  ["size", "props.size"],
  ["width", "props.width"],
])

describe("rewriteExpression", () => {
  test("renames a prop", () => {
    expect(rewriteExpression("size && `ui-${size}`", { rename })).toBe(
      "props.size && `ui-${props.size}`",
    )
  })

  test("expands a shorthand property it renames", () => {
    expect(rewriteExpression("{ size, width }", { rename })).toBe(
      "{ size: props.size, width: props.width }",
    )
  })

  test("keeps a shorthand property it doesn't rename", () => {
    expect(rewriteExpression("{ height, size }", { rename })).toBe(
      "{ height, size: props.size }",
    )
  })

  test("leaves a parameter that shadows a prop", () => {
    expect(
      rewriteExpression("items.map((item) => item.label + size)", { rename }),
    ).toBe("items.map((item) => item.label + props.size)")
  })

  test("leaves a destructured parameter that shadows a prop", () => {
    expect(
      rewriteExpression("items.map(({ size: [width] }) => width + item)", {
        rename,
      }),
    ).toBe("items.map(({ size: [width] }) => width + props.item)")
  })

  test("renames a prop inside a function that shadows another", () => {
    expect(
      rewriteExpression("function (size) { return size + width }", { rename }),
    ).toBe("function (size) { return size + props.width; }")
  })
})

describe("rewriteStatement", () => {
  test("renames inside a statement but not in a shadowing arrow", () => {
    expect(rewriteStatement("warn(size, (width) => width)", { rename })).toBe(
      "warn(props.size, (width) => width);",
    )
  })
})
