import { describe, expect, test } from "vitest"
import {
  MAX_SNAPSHOTS,
  addSnapshot,
  removeSnapshot,
  renameSnapshot,
  snapshotName,
} from "../../src/utils/theme-snapshots"

const theme = { preset: null, tokens: { "--ui-radius": "0" } }

describe("snapshotName", () => {
  test("trims, falls back and numbers duplicates", () => {
    expect(snapshotName("  Ocean  ", [])).toBe("Ocean")
    expect(snapshotName("", [])).toBe("Untitled theme")
    const taken = addSnapshot(
      addSnapshot([], "Ocean", theme, 1),
      "Ocean",
      theme,
      2,
    )
    expect(taken.map((snapshot) => snapshot.name)).toEqual(["Ocean 2", "Ocean"])
    expect(snapshotName("Ocean", taken)).toBe("Ocean 3")
  })
})

describe("addSnapshot", () => {
  test("puts the newest first with a normalized theme and caps the list", () => {
    let snapshots = addSnapshot(
      [],
      "One",
      { preset: "nope", tokens: { "--ui-radius": "0", bad: "1" } } as never,
      1,
    )
    expect(snapshots[0].theme).toEqual(theme)
    for (let index = 0; index < MAX_SNAPSHOTS + 5; index++) {
      snapshots = addSnapshot(snapshots, `T${index}`, theme, index + 2)
    }
    expect(snapshots).toHaveLength(MAX_SNAPSHOTS)
    expect(snapshots[0].name).toBe(`T${MAX_SNAPSHOTS + 4}`)
  })
})

describe("removeSnapshot and renameSnapshot", () => {
  test("remove drops by id and rename keeps names unique", () => {
    const snapshots = addSnapshot(addSnapshot([], "A", theme, 1), "B", theme, 2)
    const [b, a] = snapshots
    expect(removeSnapshot(snapshots, a.id)).toEqual([b])
    expect(renameSnapshot(snapshots, b.id, "A")[0].name).toBe("A 2")
    expect(renameSnapshot(snapshots, b.id, "C")[0].name).toBe("C")
  })
})
