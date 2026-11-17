import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  documentRecord,
  parseAtUri,
  plan,
  publicationRecord,
  recordProblems,
  sameRecord,
  SITE,
  stateProblems,
} from "../../scripts/standard-site.mjs"
import { posts } from "../../src/utils/blog-posts"
import state from "../../src/utils/standard-site.json"

const PUBLICATION = "at://did:plc:abc/site.standard.publication/3aaaaaaaaaaaa"
const DOCUMENT = "at://did:plc:abc/site.standard.document/3aaaaaaaaaaab"

describe("standard-site", () => {
  test("the publication is the site in astro.config.mjs", () => {
    const site = readFileSync("astro.config.mjs", "utf-8").match(
      /\bsite:\s*"([^"]+)"/,
    )?.[1]
    expect(publicationRecord().url).toBe(site?.replace(/\/$/, ""))
    expect(SITE).toBe(publicationRecord().url)
  })

  test("every record fits the lexicon", () => {
    expect(recordProblems(publicationRecord())).toEqual([])
    for (const post of posts) {
      expect(recordProblems(documentRecord(post, PUBLICATION))).toEqual([])
    }
  })

  test("a document points at its post's canonical URL", () => {
    const record = documentRecord(posts[0], PUBLICATION)
    expect(new URL(record.path, SITE).href).toBe(
      `${SITE}/blog/${posts[0].slug}/`,
    )
    expect(record.publishedAt).toBe(`${posts[0].date}T00:00:00.000Z`)
  })

  test("flags records the lexicon rejects", () => {
    expect(
      recordProblems({
        $type: "site.standard.document",
        path: "blog/post",
        publishedAt: "2026-10-02",
        site: "https://opui.dev/",
        tags: ["#css", "x".repeat(129)],
        title: "x".repeat(501),
      }),
    ).toEqual([
      "title is longer than 500 graphemes or 5000 bytes",
      "publishedAt must be a datetime",
      "site must be the at:// URI of a site.standard.publication record or an https URL without a trailing slash",
      "path must start with a slash",
      'tag "#css" starts with a hashtag',
      `tag "${"x".repeat(129)}" is longer than 128 graphemes or 1280 bytes`,
    ])
    expect(
      recordProblems({ $type: "site.standard.publication", url: "opui.dev" }),
    ).toEqual([
      "name is required",
      "url must be an https URL without a trailing slash",
    ])
  })

  test("standard-site.json holds one account's publication and documents", () => {
    expect(stateProblems(state)).toEqual([])
    expect(
      stateProblems({
        documents: {
          a: DOCUMENT,
          b: PUBLICATION,
          c: DOCUMENT.replace("did:plc:abc", "did:plc:xyz"),
        },
      }),
    ).toEqual([
      "documents need a publication",
      "documents.b is not the at:// URI of a site.standard.document record",
      "the records belong to more than one account: did:plc:abc, did:plc:xyz",
    ])
  })

  test("parses an at:// URI", () => {
    expect(parseAtUri(DOCUMENT)).toEqual({
      collection: "site.standard.document",
      did: "did:plc:abc",
      rkey: "3aaaaaaaaaaab",
    })
    expect(parseAtUri("at://did:plc:abc/site.standard.document/1")).toBe(
      undefined,
    )
  })

  test("plans a record for each new post and a delete for each gone one", () => {
    expect(
      plan({ documents: { gone: DOCUMENT, kept: DOCUMENT } }, ["kept", "new"]),
    ).toEqual({ create: ["new"], remove: ["gone"], update: ["kept"] })
  })

  test("compares records whatever their key order", () => {
    expect(
      sameRecord({ a: 1, b: { c: [2], d: 3 } }, { b: { d: 3, c: [2] }, a: 1 }),
    ).toBe(true)
    expect(sameRecord({ a: 1 }, { a: 2 })).toBe(false)
  })
})
