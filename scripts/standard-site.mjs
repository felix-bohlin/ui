import { readFileSync, realpathSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { blog, posts } from "../src/utils/blog-posts.ts"

export const SITE = "https://opui.dev"
export const PUBLICATION = "site.standard.publication"
export const DOCUMENT = "site.standard.document"

const STATE_FILE = fileURLToPath(
  new URL("../src/utils/standard-site.json", import.meta.url),
)
const DEFAULT_SERVICE = "https://bsky.social"

const TID = "[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}"
const AT_URI = new RegExp(
  `^at://(did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._-])/([a-zA-Z][a-zA-Z0-9.-]*)/(${TID})$`,
)
const DATETIME =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/
const HTTPS_URL = /^https:\/\/[^/\s]+(?:\/\S*[^/\s])?$/

export const parseAtUri = (uri) => {
  const match = AT_URI.exec(uri ?? "")
  return match
    ? { collection: match[2], did: match[1], rkey: match[3] }
    : undefined
}

export const publicationRecord = () => ({
  $type: PUBLICATION,
  description: blog.description,
  name: blog.title,
  url: SITE,
})

export const documentRecord = (post, site) => ({
  $type: DOCUMENT,
  description: post.description,
  path: `/blog/${post.slug}/`,
  publishedAt: new Date(post.date).toISOString(),
  site,
  ...(post.topics && { tags: post.topics }),
  title: post.title,
})

const REQUIRED = {
  [DOCUMENT]: ["publishedAt", "site", "title"],
  [PUBLICATION]: ["name", "url"],
}

const LIMITS = {
  [DOCUMENT]: { description: [30000, 3000], title: [5000, 500] },
  [PUBLICATION]: { description: [30000, 3000], name: [5000, 500] },
}

const tooLong = (text, bytes, graphemes) =>
  new TextEncoder().encode(text).length > bytes ||
  [...new Intl.Segmenter().segment(text)].length > graphemes

export const recordProblems = (record) => {
  const type = record.$type
  if (!Object.hasOwn(REQUIRED, type)) {
    return [`$type is "${type}", not ${PUBLICATION} or ${DOCUMENT}`]
  }
  const problems = REQUIRED[type]
    .filter((key) => record[key] === undefined)
    .map((key) => `${key} is required`)
  for (const [key, [bytes, graphemes]] of Object.entries(LIMITS[type])) {
    const value = record[key]
    if (value === undefined) continue
    if (typeof value !== "string") {
      problems.push(`${key} must be a string`)
    } else if (tooLong(value, bytes, graphemes)) {
      problems.push(
        `${key} is longer than ${graphemes} graphemes or ${bytes} bytes`,
      )
    }
  }
  if (type === PUBLICATION && !HTTPS_URL.test(record.url ?? "")) {
    problems.push("url must be an https URL without a trailing slash")
  }
  if (type === DOCUMENT) {
    if (
      record.publishedAt !== undefined &&
      !DATETIME.test(record.publishedAt)
    ) {
      problems.push("publishedAt must be a datetime")
    }
    if (record.updatedAt !== undefined && !DATETIME.test(record.updatedAt)) {
      problems.push("updatedAt must be a datetime")
    }
    if (
      record.site !== undefined &&
      parseAtUri(record.site)?.collection !== PUBLICATION &&
      !HTTPS_URL.test(record.site)
    ) {
      problems.push(
        `site must be the at:// URI of a ${PUBLICATION} record or an https URL without a trailing slash`,
      )
    }
    if (record.path !== undefined && !record.path.startsWith("/")) {
      problems.push("path must start with a slash")
    }
    for (const tag of record.tags ?? []) {
      if (typeof tag !== "string" || tooLong(tag, 1280, 128)) {
        problems.push(`tag "${tag}" is longer than 128 graphemes or 1280 bytes`)
      } else if (tag.startsWith("#")) {
        problems.push(`tag "${tag}" starts with a hashtag`)
      }
    }
  }
  return problems
}

export const stateProblems = (state) => {
  const { documents = {}, publication } = state
  const problems = []
  const dids = new Set()
  const check = (label, uri, collection) => {
    const parsed = parseAtUri(uri)
    if (parsed?.collection === collection) dids.add(parsed.did)
    else
      problems.push(`${label} is not the at:// URI of a ${collection} record`)
  }
  if (publication !== undefined) {
    check("publication", publication, PUBLICATION)
  } else if (Object.keys(documents).length > 0) {
    problems.push("documents need a publication")
  }
  for (const [slug, uri] of Object.entries(documents)) {
    check(`documents.${slug}`, uri, DOCUMENT)
  }
  if (dids.size > 1) {
    problems.push(
      `the records belong to more than one account: ${[...dids].toSorted().join(", ")}`,
    )
  }
  return problems
}

export const plan = ({ documents = {} }, slugs) => ({
  create: slugs.filter((slug) => !documents[slug]),
  remove: Object.keys(documents)
    .filter((slug) => !slugs.includes(slug))
    .toSorted(),
  update: slugs.filter((slug) => documents[slug]),
})

const sortKeys = (value) =>
  Array.isArray(value)
    ? value.map(sortKeys)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .toSorted()
            .map((key) => [key, sortKeys(value[key])]),
        )
      : value

export const sameRecord = (a, b) =>
  JSON.stringify(sortKeys(a)) === JSON.stringify(sortKeys(b))

const readState = () => ({
  documents: {},
  ...JSON.parse(readFileSync(STATE_FILE, "utf-8")),
})

const writeState = ({ documents, publication }) =>
  writeFileSync(
    STATE_FILE,
    `${JSON.stringify(
      {
        documents: Object.fromEntries(
          Object.entries(documents).toSorted(([a], [b]) => a.localeCompare(b)),
        ),
        publication,
      },
      null,
      2,
    )}\n`,
  )

const xrpc = async (service, method, { body, query = {}, token } = {}) => {
  const url = new URL(`/xrpc/${method}`, service)
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value)
  }
  const response = await fetch(url, {
    body: body && JSON.stringify(body),
    headers: {
      ...(body && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    method: body ? "POST" : "GET",
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw Object.assign(
      new Error(
        `${method} failed with ${response.status}: ${data.error ?? ""} ${data.message ?? ""}`.trim(),
      ),
      { code: data.error },
    )
  }
  return data
}

const pdsOf = (session) =>
  session.didDoc?.service?.find(
    (service) =>
      service.id === "#atproto_pds" ||
      service.id === `${session.did}#atproto_pds`,
  )?.serviceEndpoint

const main = async () => {
  const dryRun = process.argv.includes("--dry-run")
  const state = readState()
  const sorted = posts.toSorted((a, b) => a.slug.localeCompare(b.slug))
  const problems = [
    ...stateProblems(state),
    ...[
      publicationRecord(),
      ...sorted.map((post) => documentRecord(post, state.publication ?? SITE)),
    ].flatMap((record) =>
      recordProblems(record).map(
        (problem) => `${record.title ?? record.name}: ${problem}`,
      ),
    ),
  ]
  if (problems.length > 0) throw new Error(problems.join("\n"))

  const { create, remove, update } = plan(
    state,
    sorted.map((post) => post.slug),
  )
  if (dryRun) {
    console.log(`${state.publication ? "check" : "create"} the publication`)
    for (const slug of create) console.log(`create ${slug}`)
    for (const slug of update) console.log(`check ${slug}`)
    for (const slug of remove) console.log(`delete ${slug}`)
    return
  }

  const identifier = process.env.ATPROTO_IDENTIFIER
  const password = process.env.ATPROTO_APP_PASSWORD
  if (!identifier || !password) {
    throw new Error(
      `Set ATPROTO_IDENTIFIER to the account's handle or DID and ATPROTO_APP_PASSWORD to an app password for it. ATPROTO_SERVICE defaults to ${DEFAULT_SERVICE}.`,
    )
  }
  const service = process.env.ATPROTO_SERVICE ?? DEFAULT_SERVICE
  const session = await xrpc(service, "com.atproto.server.createSession", {
    body: { identifier, password },
  })
  const { accessJwt: token, did } = session
  const pds = pdsOf(session) ?? service
  const owner = parseAtUri(state.publication)?.did
  if (owner && owner !== did) {
    throw new Error(
      `src/utils/standard-site.json holds the records of ${owner}, but ${identifier} is ${did}`,
    )
  }

  const sync = async (collection, uri, record) => {
    if (!uri) {
      const created = await xrpc(pds, "com.atproto.repo.createRecord", {
        body: { collection, record, repo: did },
        token,
      })
      return { status: "created", uri: created.uri }
    }
    const { rkey } = parseAtUri(uri)
    const current = await xrpc(pds, "com.atproto.repo.getRecord", {
      query: { collection, repo: did, rkey },
    }).catch((error) => {
      if (error.code === "RecordNotFound") return undefined
      throw error
    })
    if (current && sameRecord(current.value, record)) {
      return { status: "unchanged", uri }
    }
    await xrpc(pds, "com.atproto.repo.putRecord", {
      body: { collection, record, repo: did, rkey },
      token,
    })
    return { status: current ? "updated" : "restored", uri }
  }

  let changes = 0
  const report = (status, label) => {
    if (status === "unchanged") return
    changes += 1
    console.log(`${status} ${label}`)
  }

  const publication = await sync(
    PUBLICATION,
    state.publication,
    publicationRecord(),
  )
  state.publication = publication.uri
  writeState(state)
  report(publication.status, `the publication ${publication.uri}`)

  for (const post of sorted) {
    const { status, uri } = await sync(
      DOCUMENT,
      state.documents[post.slug],
      documentRecord(post, state.publication),
    )
    state.documents[post.slug] = uri
    writeState(state)
    report(status, post.slug)
  }

  for (const slug of remove) {
    await xrpc(pds, "com.atproto.repo.deleteRecord", {
      body: {
        collection: DOCUMENT,
        repo: did,
        rkey: parseAtUri(state.documents[slug]).rkey,
      },
      token,
    })
    state.documents = Object.fromEntries(
      Object.entries(state.documents).filter(([key]) => key !== slug),
    )
    writeState(state)
    report("deleted", slug)
  }

  console.log(
    changes > 0
      ? "Commit src/utils/standard-site.json and deploy the site."
      : "Every record is up to date.",
  )
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
