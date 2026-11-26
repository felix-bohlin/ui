import { readStored, writeStored } from "./storage"
import { normalizeTheme, type Theme } from "./theme"

export type Snapshot = { id: string; name: string; saved: number; theme: Theme }

export const SNAPSHOTS_KEY = "opui-builder-snapshots"

export const MAX_SNAPSHOTS = 50

const isSnapshot = (value: unknown): value is Snapshot =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as Snapshot).id === "string" &&
  typeof (value as Snapshot).name === "string" &&
  typeof (value as Snapshot).saved === "number" &&
  typeof (value as Snapshot).theme === "object"

export const snapshotName = (name: string, existing: Snapshot[]) => {
  const base = name.trim().slice(0, 60) || "Untitled theme"
  const names = new Set(existing.map((snapshot) => snapshot.name))
  if (!names.has(base)) return base
  let count = 2
  while (names.has(`${base} ${count}`)) count++
  return `${base} ${count}`
}

export const addSnapshot = (
  snapshots: Snapshot[],
  name: string,
  theme: Theme,
  now = Date.now(),
): Snapshot[] =>
  [
    {
      id: `${now.toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      name: snapshotName(name, snapshots),
      saved: now,
      theme: normalizeTheme(theme),
    },
    ...snapshots,
  ].slice(0, MAX_SNAPSHOTS)

export const removeSnapshot = (snapshots: Snapshot[], id: string) =>
  snapshots.filter((snapshot) => snapshot.id !== id)

export const renameSnapshot = (
  snapshots: Snapshot[],
  id: string,
  name: string,
) =>
  snapshots.map((snapshot) =>
    snapshot.id === id
      ? {
          ...snapshot,
          name: snapshotName(
            name,
            snapshots.filter((entry) => entry.id !== id),
          ),
        }
      : snapshot,
  )

export const readSnapshots = (): Snapshot[] => {
  const stored = readStored<unknown>(SNAPSHOTS_KEY, [])
  return Array.isArray(stored)
    ? stored.filter(isSnapshot).map((snapshot) => ({
        ...snapshot,
        theme: normalizeTheme(snapshot.theme),
      }))
    : []
}

export const writeSnapshots = (snapshots: Snapshot[]) =>
  writeStored(SNAPSHOTS_KEY, snapshots)
