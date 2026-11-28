"use client"

import type { ChatLine } from "reference-shared"
import {
  createContext,
  use,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"

type Sent = Record<string, ChatLine[]>

const SentContext = createContext<[Sent, Dispatch<SetStateAction<Sent>>]>([
  {},
  () => {},
])

export function SentProvider({ children }: { children: ReactNode }) {
  const state = useState<Sent>({})
  return <SentContext value={state}>{children}</SentContext>
}

export const useSent = () => use(SentContext)
