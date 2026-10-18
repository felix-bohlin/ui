export const createId = (locals: { $id?: (prefix: string) => string }) =>
  locals.$id ??
  ((prefix: string) => `${prefix}-${crypto.randomUUID().slice(0, 8)}`)

export const autoLabelledBy = (attrs: Record<string, unknown>, id: string) =>
  attrs["aria-label"] || attrs["aria-labelledby"] ? undefined : id

export const idRefs = (...ids: (string | false | null | undefined)[]) =>
  ids.filter(Boolean).join(" ") || undefined
