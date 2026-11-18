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

type IdRef = string | false | null | undefined

export const idRefs = (...ids: IdRef[]) =>
  ids.filter(Boolean).join(" ") || undefined

export const fieldDescribedBy = (
  parts: {
    bottom?: IdRef
    end?: IdRef
    endText?: IdRef
    start?: IdRef
    startText?: IdRef
    top?: IdRef
  },
  ...ids: IdRef[]
) =>
  idRefs(
    parts.startText,
    parts.top,
    parts.start,
    parts.end,
    parts.bottom,
    parts.endText,
    ...ids,
  )
