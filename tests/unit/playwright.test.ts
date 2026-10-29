import { readdirSync, readFileSync } from "node:fs"
import { expect, test } from "vitest"
import pkg from "../../package.json"

test("the CI containers run the Playwright version package.json pins", () => {
  const version = pkg.devDependencies["@playwright/test"]
  expect(version, "pin @playwright/test to an exact version").toMatch(
    /^\d+\.\d+\.\d+$/,
  )
  const images = readdirSync(".github/workflows")
    .filter((file) => file.endsWith(".yml"))
    .flatMap((file) =>
      [
        ...readFileSync(`.github/workflows/${file}`, "utf8").matchAll(
          /mcr\.microsoft\.com\/playwright:v(\d+\.\d+\.\d+)/g,
        ),
      ].map(([, image]) => `${file}: ${image}`),
    )
  expect(images.length).toBeGreaterThan(0)
  expect(
    images.filter((image) => !image.endsWith(`: ${version}`)),
    `use mcr.microsoft.com/playwright:v${version}-noble, the @playwright/test version in package.json`,
  ).toEqual([])
})
