export const createId = (locals: { $id?: (prefix: string) => string }) =>
  locals.$id ??
  ((prefix: string) => `${prefix}-${crypto.randomUUID().slice(0, 8)}`)

export const autoLabelledBy = (attrs: Record<string, unknown>, id: string) =>
  attrs["aria-label"] || attrs["aria-labelledby"] ? undefined : id
