export const createId = (locals: { $id?: (prefix: string) => string }) =>
  locals.$id ??
  ((prefix: string) => `${prefix}-${crypto.randomUUID().slice(0, 8)}`)
