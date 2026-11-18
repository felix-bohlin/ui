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

test("keeps the first file of a code group without tabs", async () => {
  expect(
    await markdown(
      '<div class="code-group"><div class="code-files"><div class="file"><div class="code-block" data-language="css"><pre><code>a {}</code></pre></div></div><div class="file" hidden><div class="code-block" data-language="css"><pre><code>b {}</code></pre></div></div></div></div>',
    ),
  ).toBe("```css\na {}\n```")
})
