import state from "./standard-site.json"

const {
  documents,
  publication,
}: { documents: Partial<Record<string, string>>; publication?: string } = state

export { publication }

export const documentFor = (pathname: string) => {
  const slug = /^\/blog\/([^/]+)\/$/.exec(pathname)?.[1]
  return slug === undefined ? undefined : documents[slug]
}
