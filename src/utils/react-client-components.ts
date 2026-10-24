const sources = import.meta.glob<string>(
  "../../packages/opui/components/*/*.react.tsx",
  { eager: true, import: "default", query: "?raw" },
)

const name = (path: string) =>
  path
    .split("/")
    .pop()!
    .replace(/\.react\.tsx$/, "")
const folder = (path: string) => path.split("/").at(-2)!

const client = Object.keys(sources).filter((path) =>
  sources[path].startsWith('"use client"\n'),
)
const clientNames = new Set(client.map(name))

export const clientRoots = client
  .filter((path) => name(path) === folder(path))
  .map(name)
  .toSorted()

export const clientParts = client
  .filter(
    (path) => name(path) !== folder(path) && !clientNames.has(folder(path)),
  )
  .map(name)
  .toSorted()

export const joinNames = (names: string[]) =>
  names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`

export const describeClientComponents = () =>
  `${joinNames(clientRoots)}, and the ${joinNames(clientParts)} parts`
