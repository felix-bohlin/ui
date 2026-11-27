const WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
]

export const inWords = (count: number) =>
  WORDS[count] ?? count.toLocaleString("en-GB")

export const capitalized = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

export const listOf = (items: string[]) =>
  new Intl.ListFormat("en-GB", { type: "conjunction" }).format(items)
