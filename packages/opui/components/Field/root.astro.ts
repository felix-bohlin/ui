import type { AstroGlobal } from "astro"
import { fieldContext, type FieldRoot } from "./context.astro"
import { createId } from "../id"
import { createToken, fillToken } from "../slot-html"

export const renderFieldRoot = async (
  locals: AstroGlobal["locals"],
  render: () => Promise<string>,
  invalid?: boolean,
) => {
  const field: FieldRoot = {
    describedByToken: createToken(),
    endTextId: createId(locals)("end-text"),
    invalid,
    parts: new Set(),
  }
  const html = await fieldContext.provide(field, render)
  return {
    html: fillToken(
      html,
      field.describedByToken,
      field.parts.has("end-text") ? field.endTextId : undefined,
    ),
    parts: field.parts,
  }
}
