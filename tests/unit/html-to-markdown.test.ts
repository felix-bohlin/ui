import { expect, test } from "vitest"
import {
  articleToMarkdown,
  parseHtml,
} from "../../src/integrations/html-to-markdown.mjs"

const markdown = (html: string) =>
  articleToMarkdown(
    parseHtml(`<main id="main-content"><article>${html}</article></main>`),
    {
      rewriteHref: (href) => href,
    },
  )

test("keeps the label of an icon with role img and drops other icons", async () => {
  expect(
    await markdown(
      '<p>Server <svg role="img" aria-label="Yes"><path /></svg> <svg aria-hidden="true"><path /></svg></p>',
    ),
  ).toBe("Server Yes")
})
