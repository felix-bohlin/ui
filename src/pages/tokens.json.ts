import type { APIRoute } from "astro"
import { tokensJson } from "../utils/tokens-json"

export const GET: APIRoute = () =>
  new Response(`${JSON.stringify(tokensJson(), null, 2)}\n`, {
    headers: { "Content-Type": "application/json" },
  })
