import nunjucks from "nunjucks"
import { configure } from "../../packages/opui/nunjucks/index"

export const nunjucksRenderer = (id: (prefix: string) => string) => {
  const env = configure(new nunjucks.Environment(null, { autoescape: true }), {
    id,
  })
  return (source: string) => env.renderString(source, {})
}
