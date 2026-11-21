import type { Metadata } from "next"

export const metadata: Metadata = { title: "Not found" }

export default function NotFound() {
  return (
    <div className="app-screen" data-screen="not-found">
      <h1>Not found</h1>
    </div>
  )
}
