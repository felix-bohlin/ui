import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { expect, test } from "vitest"
import { FRAMEWORK_IDS } from "../../src/utils/framework"
import { ALL_APPS, appDir, referenceDir } from "../reference/apps.ts"
import { SCREENS } from "../reference/shared/screens.ts"

const SKIPPED = new Set([
  ".astro",
  ".next",
  ".nuxt",
  ".output",
  ".svelte-kit",
  "_site",
  "build",
  "dist",
  "node_modules",
  "public",
  "static",
])

const sourcesOf = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    if (SKIPPED.has(name)) return []
    const file = path.join(dir, name)
    if (statSync(file).isDirectory()) return sourcesOf(file)
    return /\.(astro|njk|svelte|tsx?|vue)$/.test(name)
      ? [readFileSync(file, "utf8")]
      : []
  })

const missingScreens = (sources: string[], ids: string[]) =>
  ids.filter(
    (id) =>
      !sources.some((source) =>
        new RegExp(`(?<!\\[)data-screen="${id}"`).test(source),
      ),
  )

const SCREEN_IDS = [...SCREENS.map((screen) => screen.id), "not-found"]

test("the check flags a screen that no source file renders", () => {
  expect(
    missingScreens(
      [
        '<div class="app-screen" data-screen="feed">',
        "data-screen={id}",
        `document.querySelector('[data-screen="chat"]')`,
      ],
      ["chat", "feed"],
    ),
  ).toEqual(["chat"])
})

test.each(ALL_APPS.map((app) => [app.name, app] as const))(
  "the %s reference app renders every screen",
  (_name, app) => {
    expect(
      missingScreens(sourcesOf(appDir(app)), SCREEN_IDS),
      `add each screen to tests/reference/apps/${app.name} with a literal data-screen="<id>" on its root, as tests/reference/README.md describes`,
    ).toEqual([])
  },
)

test("every screen has a spec", () => {
  expect(
    SCREENS.map((screen) => screen.id).filter(
      (id) => !existsSync(path.join(referenceDir, "spec", `${id}.spec.ts`)),
    ),
    "write tests/reference/spec/<id>.spec.ts for each screen in tests/reference/shared/screens.ts",
  ).toEqual([])
})

test("every app has a folder, and every folder an app", () => {
  expect(readdirSync(path.join(referenceDir, "apps")).toSorted()).toEqual(
    ALL_APPS.map((app) => app.name).toSorted(),
  )
})

test("every framework but HTML has a reference app", () => {
  expect(
    FRAMEWORK_IDS.filter(
      (id) => id !== "html" && !ALL_APPS.some((app) => app.framework === id),
    ),
    "add an app for the framework to tests/reference/apps.ts and tests/reference/apps/",
  ).toEqual([])
})
