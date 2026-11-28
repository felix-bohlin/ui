import { createHash } from "node:crypto"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { crc32, deflateSync } from "node:zlib"
import { afterAll, describe, expect, test } from "vitest"
import {
  MARKER,
  byProject,
  commitMessage,
  compareBaselines,
  contentHash,
  hashBaselines,
  imageComparator,
  passingBaselines,
  report,
} from "../../scripts/baseline-changes.mjs"

const sha = (content: string) =>
  createHash("sha256").update(content).digest("hex")
const pointer = (content: string) =>
  `version https://git-lfs.github.com/spec/v1\noid sha256:${sha(content)}\nsize ${content.length}\n`
const plain = (content: string) => ({ lfs: false, sha256: sha(content) })
const stored = (content: string) => ({ lfs: true, sha256: sha(content) })

const repository = "https://github.com/felix-bohlin/ui"
const before = "a".repeat(40)
const after = "b".repeat(40)

const result = compareBaselines(
  {
    "dark/kept.png": stored("kept"),
    "dark/moved.png": plain("moved"),
    "light/changed.png": stored("old"),
    "light/gone.png": stored("gone"),
  },
  {
    "dark/kept.png": plain("kept"),
    "dark/moved.png": plain("moved"),
    "dark/new.png": plain("new"),
    "light/changed.png": plain("new look"),
  },
)

describe("contentHash", () => {
  test("reads the object id of a Git LFS pointer", () => {
    expect(contentHash(Buffer.from(pointer("image")))).toEqual(stored("image"))
  })

  test("hashes the content of a plain file", () => {
    expect(contentHash(Buffer.from("image"))).toEqual(plain("image"))
  })

  test("hashes a file that only starts like a pointer", () => {
    const text = "version https://git-lfs.github.com/spec/v1\nsize 5\n"
    expect(contentHash(Buffer.from(text))).toEqual(plain(text))
  })
})

describe("hashBaselines", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "baselines-"))
  afterAll(() => rmSync(dir, { force: true, recursive: true }))

  test("hashes the PNGs in each project folder", () => {
    mkdirSync(path.join(dir, "dark"))
    mkdirSync(path.join(dir, "light"))
    writeFileSync(path.join(dir, "light/button.png"), "pixels")
    writeFileSync(path.join(dir, "dark/button.png"), pointer("dark pixels"))
    writeFileSync(path.join(dir, "light/notes.txt"), "not a baseline")
    expect(hashBaselines(dir)).toEqual({
      "dark/button.png": stored("dark pixels"),
      "light/button.png": plain("pixels"),
    })
  })

  test("finds nothing in a missing folder", () => {
    expect(hashBaselines(path.join(dir, "missing"))).toEqual({})
  })
})

const chunk = (type: string, data: Buffer) => {
  const body = Buffer.concat([Buffer.from(type), data])
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

const png = (dark: number, gray = 255) => {
  const size = 20
  const header = Buffer.alloc(13)
  header.writeUInt32BE(size, 0)
  header.writeUInt32BE(size, 4)
  header[8] = 8
  header[9] = 6
  const rows = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const value = y * size + x < dark ? 0 : gray
      rows.fill(
        value,
        y * (size * 4 + 1) + 1 + x * 4,
        y * (size * 4 + 1) + 4 + x * 4,
      )
      rows[y * (size * 4 + 1) + 4 + x * 4] = 255
    }
  }
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(rows)),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

describe("imageComparator", async () => {
  const compare = await imageComparator()

  test("passes an image within the thresholds of playwright.config.ts", () => {
    expect(compare(png(100), png(0))).toBeNull()
    expect(compare(png(0, 250), png(0))).toBeNull()
  })

  test("fails an image a visual test would fail on", () => {
    expect(compare(png(101), png(0))).toHaveProperty("errorMessage")
    expect(compare(png(0, 200), png(0))).toHaveProperty("errorMessage")
  })
})

describe("passingBaselines", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "baselines-"))
  const before = path.join(dir, "before")
  const after = path.join(dir, "after")
  afterAll(() => rmSync(dir, { force: true, recursive: true }))
  const write = (root: string, files: Record<string, string>) => {
    mkdirSync(path.join(root, "light"), { recursive: true })
    for (const [file, content] of Object.entries(files)) {
      writeFileSync(path.join(root, file), content)
    }
  }
  const compare = (actual: Buffer, expected: Buffer) =>
    actual.toString().startsWith(expected.toString())
      ? null
      : { errorMessage: "different" }

  test("lists the changed baselines whose new image passes against the old", () => {
    write(before, {
      "light/close.png": "image",
      "light/far.png": "image",
      "light/same.png": "image",
    })
    write(after, {
      "light/close.png": "image, antialiased",
      "light/far.png": "another image",
      "light/new.png": "image",
      "light/same.png": "image",
    })
    expect(passingBaselines(before, after, compare)).toEqual([
      "light/close.png",
    ])
  })

  test("fails on a baseline that is still a Git LFS pointer", () => {
    write(before, { "light/close.png": pointer("image") })
    expect(() => passingBaselines(before, after, compare)).toThrow(
      "light/close.png is a Git LFS pointer",
    )
  })
})

describe("compareBaselines", () => {
  test("sorts the files into added, changed and removed by content", () => {
    expect(result).toEqual({
      added: ["dark/new.png"],
      changed: ["light/changed.png"],
      converted: 1,
      removed: ["light/gone.png"],
      unchanged: 2,
    })
  })

  test("groups the changes by project", () => {
    expect(byProject(result)).toEqual([
      { added: ["dark/new.png"], changed: [], project: "dark", removed: [] },
      {
        added: [],
        changed: ["light/changed.png"],
        project: "light",
        removed: ["light/gone.png"],
      },
    ])
  })
})

describe("commitMessage", () => {
  test("counts the changes in the subject and per project", () => {
    expect(commitMessage(result)).toBe(
      [
        "chore: update visual snapshots (1 added, 1 changed, 1 removed)",
        "",
        "dark: 1 added",
        "light: 1 changed, 1 removed",
        "Moves 1 baselines from plain PNGs to Git LFS pointers.",
        "",
      ].join("\n"),
    )
  })

  test("says when no image changed", () => {
    const same = { "light/a.png": stored("a") }
    expect(commitMessage(compareBaselines(same, same))).toBe(
      "chore: update visual snapshots (no image changed)\n",
    )
  })
})

describe("report", () => {
  const text = report(result, { after, before, repository })

  test("starts with the marker the comment is found by", () => {
    expect(text.split("\n")[0]).toBe(MARKER)
  })

  test("links added and changed images to the new commit", () => {
    expect(text).toContain(
      `- [new.png](${repository}/blob/${after}/tests/e2e/__screenshots__/dark/new.png)`,
    )
    expect(text).toContain(
      `- [changed.png](${repository}/blob/${after}/tests/e2e/__screenshots__/light/changed.png)`,
    )
    expect(text).toContain(`[\`bbbbbbb\`](${repository}/commit/${after})`)
  })

  test("links removed images to the commit before the run", () => {
    expect(text).toContain(
      `- [gone.png](${repository}/blob/${before}/tests/e2e/__screenshots__/light/gone.png)`,
    )
  })

  test("lists projects and statuses in ascending order", () => {
    const headings = text
      .split("\n")
      .filter((line) => line.startsWith("#### ") || line.endsWith("):"))
    expect(headings).toEqual([
      "#### dark",
      "Added (1):",
      "#### light",
      "Changed (1):",
      "Removed (1):",
    ])
  })

  test("names files without links when there is no repository", () => {
    expect(report(result)).toContain("- `new.png`")
  })

  test("stops at the limit and counts what it left out", () => {
    const short = report(result, {
      after,
      before,
      limit: 400,
      more: "See the run.",
      repository,
    })
    expect(short.length).toBeLessThanOrEqual(400)
    expect(short).toMatch(/\n\d more not listed\. See the run\.\n$/)
  })
})
