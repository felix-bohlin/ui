import { expect, test } from "@playwright/test"
import { normalize } from "../unit/normalize"
import {
  COMPONENTS,
  exampleSnapshots,
  FRAMEWORKS,
  openFixture,
  pageErrors,
  type Framework,
} from "./fixtures"

const CLIENT_RENDERED: Framework[] = ["react", "solid", "svelte", "vue"]

for (const framework of FRAMEWORKS) {
  const client = CLIENT_RENDERED.includes(framework)
  for (const component of COMPONENTS) {
    test(`${framework}/${component} runs without errors${client ? " and renders its server markup on the client" : ""}`, async ({
      page,
    }) => {
      const errors = pageErrors(page)

      const response = await page.request.get(
        `/${framework}/test/${component}/`,
      )
      await openFixture(page, framework, component)
      expect(errors, "page errors").toEqual([])
      if (!client) return

      const server = await exampleSnapshots(
        page,
        framework,
        await response.text(),
      )
      const rendered = await exampleSnapshots(page, framework)
      expect(rendered.map(({ example }) => example)).toEqual(
        server.map(({ example }) => example),
      )
      expect(server.length).toBeGreaterThan(0)
      for (const [index, { example, markup, state }] of server.entries()) {
        expect
          .soft(normalize(rendered[index].markup), `${example} markup`)
          .toBe(normalize(markup))
        expect
          .soft(rendered[index].state, `${example} form state`)
          .toEqual(state)
      }
    })
  }
}
