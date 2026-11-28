import type { ChatLine } from "reference-shared"

export const useSentMessages = () =>
  useState<Record<string, ChatLine[]>>("sent-messages", () => ({}))
