import type { ChatLine } from "reference-shared"
import type { JSX } from "@solidjs/web"
import { createContext, createStore, useContext } from "solid-js"

const createSent = () => createStore<Record<string, ChatLine[]>>({})

const SentContext = createContext<ReturnType<typeof createSent>>()

export function SentMessages(props: { children: JSX.Element }) {
  return <SentContext value={createSent()}>{props.children}</SentContext>
}

export const useSent = () => useContext(SentContext)
