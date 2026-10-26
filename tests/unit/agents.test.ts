import { execFileSync } from "node:child_process"
import { matchesGlob } from "node:path"
import { describe, expect, test } from "vitest"
import {
  componentsOf,
  parseAgent,
  readAgents,
  scopeOf,
} from "../../scripts/audit-scope.mjs"

const agents = readAgents()
const tracked = execFileSync("git", ["ls-files"], { encoding: "utf-8" })
  .split("\n")
  .filter(Boolean)

describe("review agents", () => {
  test("name, describe and scope themselves in their frontmatter", () => {
    expect(
      agents.flatMap(({ description, file, name, paths, tools }) => [
        ...(name === file.replace(/\.md$/, "")
          ? []
          : [`${file}: name must be ${file.replace(/\.md$/, "")}`]),
        ...(description ? [] : [`${file}: description is required`]),
        ...(tools ? [] : [`${file}: tools is required`]),
        ...(Array.isArray(paths) && paths.length
          ? []
          : [`${file}: paths must list the globs the agent reviews`]),
        ...(Array.isArray(paths) &&
        paths.join("\n") !== paths.toSorted().join("\n")
          ? [`${file}: sort paths in ascending order`]
          : []),
      ]),
    ).toEqual([])
  })

  test("every path matches a tracked file", () => {
    expect(
      agents.flatMap(
        ({ file, paths }) =>
          paths
            ?.filter((glob) => !tracked.some((path) => matchesGlob(path, glob)))
            .map((glob) => `${file}: ${glob}`) ?? [],
      ),
      "a glob in an agent's paths matches no tracked file: fix or remove it",
    ).toEqual([])
  })
})

describe("audit-scope", () => {
  const pages = ["button", "button-group", "tabs", "toggle"]

  test("parses a list in the frontmatter", () => {
    expect(
      parseAgent("---\nname: css\npaths:\n  - a/**\n  - b/*.css\n---\n\nBody"),
    ).toEqual({ name: "css", paths: ["a/**", "b/*.css"] })
  })

  test("maps a file to the pages of its components", () => {
    expect(
      [
        "packages/opui/components/ButtonGroup/ButtonGroup.vue",
        "packages/opui/components/ToggleButton/types.ts",
        "packages/opui/css/components/button.css",
        "src/component-api/tabs-panel/api.ts",
        "src/utils/todo.ts",
      ].map((file) => componentsOf(file, pages)),
    ).toEqual([["button-group"], ["toggle"], ["button"], ["tabs"], []])
  })

  test("picks the agents whose paths the files touch", () => {
    const scope = scopeOf({
      agents: [
        { name: "css", paths: ["packages/opui/css/**"] },
        { name: "examples", paths: ["src/component-examples/**"] },
      ],
      files: [
        "packages/opui/css/components/button.css",
        "packages/opui/css/components/tabs.css",
      ],
      pages,
      slugs: ["tabs"],
    })
    expect(scope).toEqual([
      {
        components: ["tabs"],
        files: ["packages/opui/css/components/tabs.css"],
        name: "css",
        paths: ["packages/opui/css/**"],
      },
    ])
  })
})
