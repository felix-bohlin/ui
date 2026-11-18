import type { APIRoute } from "astro"
import { FIGMA_THEMES, figmaModeFile } from "../../../utils/figma-themes"
import { FIGMA_MODES, figmaJson } from "../../../utils/figma-tokens"

export const getStaticPaths = () =>
  FIGMA_THEMES.flatMap(({ id }) =>
    FIGMA_MODES.map((mode) => ({ params: { mode: mode.id, theme: id } })),
  )

export const GET: APIRoute = ({ params }) =>
  new Response(figmaJson(figmaModeFile(params.theme!, params.mode!)), {
    headers: { "Content-Type": "application/json" },
  })
