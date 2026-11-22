import { httpStatus } from "@solidjs/web"
import { useTitle } from "../lib/title"

export default function NotFound() {
  httpStatus(404)
  useTitle(() => "Not found")
  return (
    <div class="app-screen" data-screen="not-found">
      <h1>Not found</h1>
    </div>
  )
}
