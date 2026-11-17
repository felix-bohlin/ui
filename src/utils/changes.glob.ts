import { changesOf, type Change } from "./changes"

export const changes = changesOf(
  Object.entries(
    import.meta.glob<Change>("../../changes/*/*/*.ts", {
      eager: true,
      import: "default",
    }),
  ),
)
