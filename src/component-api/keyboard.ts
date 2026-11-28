import type { ApiKeyboard } from "./types"

export const KEYS = [
  "Tab",
  "Shift + Tab",
  "Enter",
  "Space",
  "Up Arrow",
  "Down Arrow",
  "Left Arrow",
  "Right Arrow",
  "Home",
  "End",
  "Page Up",
  "Page Down",
  "Esc",
  "Printable characters",
] as const

export type ApiKey = (typeof KEYS)[number]

export const modalKeyboard = (name: string) =>
  [
    {
      description: `Moves focus to the next focusable element in the ${name}. After the last one, focus moves to the browser's own controls (like the address bar), then back to the first element in the ${name}. The page behind it is inert.`,
      keys: ["Tab"],
    },
    {
      description: `Moves focus to the previous focusable element. Before the first one, focus moves to the browser's controls, then to the last element in the ${name}.`,
      keys: ["Shift + Tab"],
    },
    {
      description: `Closes the ${name}, unless \`closedby="none"\`, and returns focus to the element that opened it.`,
      keys: ["Esc"],
    },
  ] satisfies ApiKeyboard[]
