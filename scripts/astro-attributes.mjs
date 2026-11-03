import { parse } from "@astrojs/compiler"

const QUOTED = /^[^\s=]+\s*=\s*(?:(["'])([\s\S]*?)\1|([^\s"'>]+))/

/** @param {string} file @param {string} text */
export const astroAttributeProblems = async (file, text) => {
  const { ast } = await parse(text, { position: true })
  const bytes = Buffer.from(text)
  const problems = []
  const visit = (node) => {
    for (const attribute of node.attributes ?? []) {
      if (attribute.kind !== "quoted" || !attribute.position) continue
      const match = QUOTED.exec(
        bytes.subarray(attribute.position.start.offset).toString(),
      )
      const raw = match?.[1] ? match[2] : match?.[3]
      if (raw === undefined || raw === attribute.value) continue
      problems.push(
        `${file}:${attribute.position.start.line}: ${attribute.name}="${raw}" has character references, and Prettier's Astro plugin writes them decoded ("${attribute.value}"), which can change what it means. Write the value as an expression: ${attribute.name}={${JSON.stringify(attribute.value)}}`,
      )
    }
    for (const child of node.children ?? []) visit(child)
  }
  visit(ast)
  return problems
}
