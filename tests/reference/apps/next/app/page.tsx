import type { Metadata } from "next"
import Feed from "./feed"

export const metadata: Metadata = { title: { absolute: "Feed | Reference" } }

export default function FeedPage() {
  return <Feed />
}
