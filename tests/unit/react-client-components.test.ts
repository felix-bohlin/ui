import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import {
  clientParts,
  clientRoots,
  describeClientComponents,
} from "../../src/utils/react-client-components"

test("finds the client roots and the client parts of server roots", () => {
  expect(clientRoots).toContain("Menu")
  expect(clientRoots).not.toContain("Tooltip")
  expect(clientParts).toEqual(["CheckboxInput", "RadioInput", "SwitchInput"])
})

test("the README names the same components", () => {
  const readme = readFileSync("packages/opui/README.md", "utf-8")
  expect(readme).toContain(
    `Components that need context, state or effects (${describeClientComponents()}) are marked \`"use client"\``,
  )
})
