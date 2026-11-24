type Locals = { $id?: (prefix: string) => string }

export const createId = (locals: Locals) =>
  locals.$id ??
  ((prefix: string) => `${prefix}-${crypto.randomUUID().slice(0, 8)}`)

export const createIds = (
  locals: Locals,
  prefix: string,
  id?: string | false | null,
) => {
  let base = id === false ? undefined : id
  return (part?: string) => {
    base ||= createId(locals)(prefix)
    return part ? `${base}-${part}` : base
  }
}

export const autoLabelledBy = (
  attrs: { "aria-label"?: unknown; "aria-labelledby"?: unknown },
  id: string,
) => (attrs["aria-label"] || attrs["aria-labelledby"] ? undefined : id)
