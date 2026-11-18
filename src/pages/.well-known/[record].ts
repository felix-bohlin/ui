import type { APIRoute } from "astro"
import { publication } from "../../utils/standard-site"

export const getStaticPaths = () =>
  publication ? [{ params: { record: "site.standard.publication" } }] : []

export const GET: APIRoute = () =>
  new Response(publication, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
