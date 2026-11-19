import type { Metadata } from "next"
import Chat from "./chat"

export const metadata: Metadata = { title: "Chat" }

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const handle = (await searchParams).with
  return <Chat handle={typeof handle === "string" ? handle : null} />
}
