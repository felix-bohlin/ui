import type { APIRoute, GetStaticPaths } from "astro"
import { portableCss, PRESETS } from "../../utils/theme-presets"

export const getStaticPaths = (() =>
  PRESETS.map((preset) => ({
    params: { preset: preset.id },
    props: { preset },
  }))) satisfies GetStaticPaths

export const GET: APIRoute = ({ props, site }) => {
  const origin = new URL(site ?? "https://open-props-ui.netlify.app/").origin
  return new Response(portableCss(props.preset, origin), {
    headers: { "Content-Type": "text/css; charset=utf-8" },
  })
}
