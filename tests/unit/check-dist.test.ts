import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { describe, expect, test } from "vitest"
import { distProblems, NETLIFY_ORIGIN } from "../../scripts/check-dist.mjs"
import { FRAMEWORK_IDS } from "../../src/utils/framework.js"

const site = new URL("https://example.com")

const page = (body: string, head = "") =>
  `<!doctype html><html><head>${head}</head><body>${body}</body></html>`

const IMPORT_MAP = `<script type="importmap">${JSON.stringify({
  imports: { "opui-css/elements/a.js": "/_astro/a.H1.js" },
  scopes: { "/_astro/a.H1.js": { "/_astro/internal/b.js": "/_astro/b.H2.js" } },
})}</script>`

const BUTTON = page(
  '<h2 id="sizes">Sizes</h2><a href="/html/components/button/#sizes">Sizes</a><a href="#top">Top</a>',
  IMPORT_MAP,
)

const IMPORT_MAP_PROBLEM =
  "which does not exist: src/utils/import-map.ts scopes each module it serves to map its relative imports to the files the build emits"

const TIMELINE_SHORTHAND =
  "puts a timeline in the animation shorthand, which browsers drop with the whole declaration: Lightning CSS folds an animation-timeline that follows the shorthand into it when Astro minifies, so write that rule with animation-* longhands"

const DOMAIN_RULE = `${NETLIFY_ORIGIN}/* https://example.com/:splat 301!`

const clean = () => ({
  "/_redirects": `${DOMAIN_RULE}\n`,
  "/_astro/a.H1.js": 'import { b } from "./internal/b.js"\n\nb()\n',
  "/_astro/b.H2.js": "export const b = () => {}\n",
  "/_astro/page.css":
    ".a{animation:spin 1s var(--ease,linear) infinite}.b{animation-fill-mode:both;animation-name:fill;animation-timeline:scroll(root)}.c{--animation:fill view()}",
  "/html/components/button/index.html": BUTTON,
  "/html/components/button.md": "# Button\n",
  ...Object.fromEntries(
    FRAMEWORK_IDS.map((id) => [
      `/${id}/llms.txt`,
      id === "html" ? "- [Button](/html/components/button.md)\n" : "\n",
    ]),
  ),
})

const check = (
  files: Record<string, string | undefined>,
  searchIndex = [{ url: "/html/components/button/" }],
  standardSite?: { documents: Record<string, string>; publication?: string },
) => {
  const dist = mkdtempSync(join(tmpdir(), "opui-dist-"))
  for (const [path, text] of Object.entries(files)) {
    if (text === undefined) continue
    mkdirSync(dirname(join(dist, path)), { recursive: true })
    writeFileSync(join(dist, path), text)
  }
  const problems = distProblems({
    dist,
    searchIndex,
    site,
    standardSite,
  }).problems.map(([message, sources]) => `${message} <- ${sources.join(", ")}`)
  rmSync(dist, { force: true, recursive: true })
  return problems
}

describe("check-dist", () => {
  test("reports nothing for a clean dist", () => {
    expect(check(clean())).toEqual([])
  })

  test.each([
    [
      "a link to a missing page",
      { "/html/components/button/index.html": page('<a href="/nope/">x</a>') },
      "/nope/ does not exist <- /html/components/button/",
    ],
    [
      "a link to a missing anchor",
      {
        "/html/components/button/index.html": page(
          '<a href="/html/components/button/#nope">x</a>',
        ),
      },
      "/html/components/button/#nope has no element with that id <- /html/components/button/",
    ],
    [
      "an id used twice",
      {
        "/html/components/button/index.html": page(
          '<h2 id="sizes">a</h2><h3 id="sizes">b</h3>',
        ),
      },
      'id "sizes" is used more than once <- /html/components/button/',
    ],
    [
      "a noindex page in the sitemap",
      {
        "/html/guide/index.html": page(
          "",
          '<meta name="robots" content="noindex">',
        ),
        "/sitemap-0.xml":
          "<urlset><url><loc>https://example.com/html/guide/</loc></url></urlset>",
      },
      "/html/guide/ is noindex but listed in the sitemap; the sitemap() filter in astro.config.mjs drops noindex pages <- /sitemap-0.xml",
    ],
    [
      "a framework page without its Markdown version",
      { "/html/guide/start/index.html": page("") },
      "/html/guide/start/ has no Markdown version: articleToMarkdown in src/integrations/html-to-markdown.mjs found no #main-content > article <- /html/guide/start/",
    ],
    [
      "a page llms.txt doesn't link",
      {
        "/html/guide/start/index.html": page(""),
        "/html/guide/start.md": "# Start\n",
      },
      "/html/guide/start.md is not linked from /html/llms.txt; llmsTxt in src/integrations/llms.mjs lists component, guide, blog, block and api pages <- /html/guide/start/",
    ],
    [
      "a missing llms.txt",
      { "/vue/llms.txt": undefined },
      "/vue/llms.txt does not exist <- /vue/",
    ],
    [
      "an animation shorthand with a scroll timeline in a stylesheet",
      {
        "/_astro/page.css":
          ".a::before{animation:linear both fill scroll(root);position:absolute}",
      },
      `"animation:linear both fill scroll(root)" ${TIMELINE_SHORTHAND} <- /_astro/page.css`,
    ],
    [
      "an animation shorthand with a named timeline in a style element",
      {
        "/html/components/button/index.html": BUTTON.replace(
          "<head>",
          "<head><style>.a{animation:linear both fill --stages}</style>",
        ),
      },
      `"animation:linear both fill --stages" ${TIMELINE_SHORTHAND} <- /html/components/button/`,
    ],
    [
      "a module the import map serves that is missing",
      { "/_astro/b.H2.js": undefined },
      "/_astro/b.H2.js is in the import map but does not exist <- /html/components/button/",
    ],
    [
      "a relative import of a module the import map serves that it doesn't map",
      { "/_astro/b.H2.js": 'export { c } from "./c.js"\n' },
      `/_astro/b.H2.js imports "./c.js", which loads /_astro/c.js, ${IMPORT_MAP_PROBLEM} <- /html/components/button/`,
    ],
    [
      "a relative import of a module the import map serves without a scope",
      {
        "/html/components/button/index.html": BUTTON.replace(
          /"scopes":\{.*?\}\}/,
          '"scopes":{}',
        ),
      },
      `/_astro/a.H1.js imports "./internal/b.js", which loads /_astro/internal/b.js, ${IMPORT_MAP_PROBLEM} <- /html/components/button/`,
    ],
    [
      "a _redirects with another rule ahead of the domain rule",
      { "/_redirects": `/old /new 301\n${DOMAIN_RULE}\n` },
      `/_redirects doesn't start with "${DOMAIN_RULE}": public/_redirects sends the netlify.app address to site in astro.config.mjs, path included, ahead of every other rule <- /_redirects`,
    ],
  ])("reports %s", (_, files, problem) => {
    expect(check({ ...clean(), ...files })).toEqual([problem])
  })

  test("reports a search index entry for a missing page", () => {
    expect(check(clean(), [{ url: "/html/components/gone/" }])).toEqual([
      "/html/components/gone/ does not exist <- /search-index/",
    ])
  })

  test("follows redirects and allows placeholder links in previews", () => {
    expect(
      check({
        ...clean(),
        "/blocks/card/preview/index.html": page(
          '<a href="#nothing">x</a>',
          '<meta name="robots" content="noindex">',
        ),
        "/html/components/button/index.html": BUTTON.replace(
          "</body>",
          '<a href="/html/old/#sizes">Old</a></body>',
        ),
        "/html/guide/start.md": "# Start\n",
        "/html/guide/start/index.html": page(
          '<div class="example-preview"><a href="#somewhere">x</a></div>',
        ),
        "/html/llms.txt":
          "- [Button](/html/components/button.md)\n- [Start](/html/guide/start.md)\n",
        "/html/old/index.html": page(
          "",
          '<meta http-equiv="refresh" content="0;url=/html/components/button/">',
        ),
      }),
    ).toEqual([])
  })

  describe("Standard Site", () => {
    const publication =
      "at://did:plc:abc/site.standard.publication/3aaaaaaaaaaaa"
    const document = "at://did:plc:abc/site.standard.document/3aaaaaaaaaaab"
    const records = { documents: { post: document }, publication }
    const LINKS = `<link rel="site.standard.publication" href="${publication}"><link rel="site.standard.document" href="${document}">`
    const WELL_KNOWN = "/.well-known/site.standard.publication"
    const SERVES = `src/pages/.well-known/[record].ts serves the publication in src/utils/standard-site.json <- ${WELL_KNOWN}`
    const post = (head: string) => ({
      "/blog/post.md": "# Post\n",
      "/blog/post/index.html": page("", head),
    })

    test("reports nothing when the records are served and linked", () => {
      expect(
        check(
          { ...clean(), ...post(LINKS), [WELL_KNOWN]: publication },
          undefined,
          records,
        ),
      ).toEqual([])
    })

    test.each([
      [
        "a post without its links",
        { ...post(""), [WELL_KNOWN]: publication },
        records,
        '/blog/post/ doesn\'t link its Standard Site records: Layout.astro adds <link rel="site.standard.publication"> and <link rel="site.standard.document"> from src/utils/standard-site.json <- /blog/post/',
      ],
      [
        "a missing well-known file",
        post(LINKS),
        records,
        `${WELL_KNOWN} serves nothing instead of "${publication}": ${SERVES}`,
      ],
      [
        "a well-known file without a publication",
        { [WELL_KNOWN]: publication },
        undefined,
        `${WELL_KNOWN} serves "${publication}" instead of nothing: ${SERVES}`,
      ],
    ])("reports %s", (_, files, standardSite, problem) => {
      expect(check({ ...clean(), ...files }, undefined, standardSite)).toEqual([
        problem,
      ])
    })
  })
})
