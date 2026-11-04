const COMMENT = /<!--(?:(?!-->)[\s\S])*-->/g
const EDGE = String.raw`(?:[\t\n\f\r ]|<!--(?:(?!-->)[\s\S])*-->)+`

const commentsOf = (edge: string) => (edge.match(COMMENT) ?? []).join("")

export const trimEdges = (text: string) =>
  text
    .replace(new RegExp(`^${EDGE}`), commentsOf)
    .replace(new RegExp(`${EDGE}$`), commentsOf)
