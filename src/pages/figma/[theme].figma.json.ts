import type { APIRoute } from "astro"
import { FIGMA_THEMES, figmaThemeFile } from "../../utils/figma-themes"
import { figmaJson } from "../../utils/figma-tokens"

export const getStaticPaths = () =>
  FIGMA_THEMES.map(({ id }) => ({ params: { theme: id } }))

export const GET: APIRoute = ({ params }) =>
  new Response(figmaJson(figmaThemeFile(params.theme!)), {
    headers: { "Content-Type": "application/json" },
  })
