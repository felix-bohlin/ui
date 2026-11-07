const SENTENCE = /\.\s+(?=[A-Z`(])/g
const COLON = /:\s+(?=\S)/g
const TICK = /`/g
const LONG = 110
const SHORT_REST = 60

const outsideCode = (text: string, index: number) =>
  (text.slice(0, index).match(TICK)?.length ?? 0) % 2 === 0

const firstBreak = (text: string, pattern: RegExp, end = text.length) =>
  [...text.matchAll(pattern)].find(
    (match) => match.index < end && outsideCode(text, match.index),
  )

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

export const leadSentence = (text: string) => {
  const sentence = firstBreak(text, SENTENCE)
  const end = sentence?.index ?? text.length
  const colon = end > LONG ? firstBreak(text, COLON, end) : undefined
  const cut = colon ?? sentence
  if (!cut) return [text, ""]
  const rest = text.slice(cut.index + cut[0].length)
  if (rest.length < SHORT_REST) return [text, ""]
  return [`${text.slice(0, cut.index)}.`, colon ? capitalize(rest) : rest]
}
