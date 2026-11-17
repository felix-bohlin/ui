import state from "./standard-site.json"

export const {
  documents,
  publication,
}: { documents: Partial<Record<string, string>>; publication?: string } = state

export const documentFor = (pathname: string) => {
  const slug = /^\/blog\/([^/]+)\/$/.exec(pathname)?.[1]
  return slug === undefined ? undefined : documents[slug]
}
