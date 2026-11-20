import { error } from "@sveltejs/kit"
import { user } from "reference-shared"

export const load = ({ params }) => {
  const found = user(params.handle)
  if (!found) error(404)
  return { user: found }
}
