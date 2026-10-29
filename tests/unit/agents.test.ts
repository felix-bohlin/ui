import { execFileSync, spawnSync } from "node:child_process"
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

type Agent = (typeof agents)[number]

const frontmatterProblems = ({
  description,
  file,
  name,
  paths,
  tools,
}: Agent) => [
  ...(name === file.replace(/\.md$/, "")
    ? []
    : [`${file}: name must be ${file.replace(/\.md$/, "")}`]),
  ...(description ? [] : [`${file}: description is required`]),
  ...(tools ? [] : [`${file}: tools is required`]),
  ...(Array.isArray(paths) && paths.length
    ? []
    : [`${file}: paths must list the globs the agent reviews`]),
  ...(Array.isArray(paths) && paths.join("\n") !== paths.toSorted().join("\n")
    ? [`${file}: sort paths in ascending order`]
    : []),
]

const unmatchedPaths = ({ file, paths }: Agent, files: string[]) =>
  paths
    ?.filter((glob) => !files.some((path) => matchesGlob(path, glob)))
    .map((glob) => `${file}: ${glob}`) ?? []

describe("review agents", () => {
  test("name, describe and scope themselves in their frontmatter", () => {
    expect(agents.flatMap(frontmatterProblems)).toEqual([])
  })

  test("every path matches a tracked file", () => {
    expect(
      agents.flatMap((agent) => unmatchedPaths(agent, tracked)),
      "a glob in an agent's paths matches no tracked file: fix or remove it",
    ).toEqual([])
  })
})

describe("the agent rules flag their samples", () => {
  const agent = (source: string) => ({ file: "css.md", ...parseAgent(source) })

  test("a frontmatter without a matching name, a description, tools or sorted paths", () => {
    expect(
      frontmatterProblems(
        agent("---\nname: scss\npaths:\n  - b/**\n  - a/**\n---\n"),
      ),
    ).toEqual([
      "css.md: name must be css",
      "css.md: description is required",
      "css.md: tools is required",
      "css.md: sort paths in ascending order",
    ])
    expect(
      frontmatterProblems(
        agent(
          "---\nname: css\ndescription: d\ntools: Read\npaths:\n  - a/**\n---\n",
        ),
      ),
    ).toEqual([])
  })

  test("a glob that matches no file", () => {
    expect(
      unmatchedPaths(agent("---\npaths:\n  - a/**\n  - b/*.css\n---\n"), [
        "a/one.ts",
      ]),
    ).toEqual(["css.md: b/*.css"])
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

  test("an agent without paths matches no file", () => {
    expect(
      scopeOf({
        agents: [{ name: "css" }],
        files: ["packages/opui/css/components/tabs.css"],
        pages,
        slugs: [],
      }),
    ).toEqual([])
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

describe("scripts/audit-scope.mjs", () => {
  const scope = (...args: string[]) =>
    spawnSync("node", ["scripts/audit-scope.mjs", ...args], {
      encoding: "utf-8",
    })

  test("picks the agents for a component, with its files", () => {
    const { status, stdout } = scope("tabs")
    expect(status).toBe(0)
    const { agents } = JSON.parse(stdout)
    expect(agents.map(({ name }: { name: string }) => name)).toContain("css")
    expect(
      agents.every(({ files }: { files: string[] }) => files.length > 0),
    ).toBe(true)
  })

  test("fails on a word that is no agent or component", () => {
    const { status, stderr } = scope("nope")
    expect(status).toBe(1)
    expect(stderr).toContain("nope: not an agent")
  })
})
