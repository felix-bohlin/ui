import { error } from "@sveltejs/kit"
import slugs from "#lib/examples/slugs.json"

export const load = ({ params }) => {
  if (!slugs.includes(params.component)) error(404)
}
