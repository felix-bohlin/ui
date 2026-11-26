import nunjucks from "nunjucks"
import { configure } from "opui-css/nunjucks"

const env = configure(new nunjucks.Environment(null, { autoescape: true }), {
  id: (prefix) => `${prefix}-1`,
})

export const render = (name: string) =>
  env.renderString(
    `{% from "opui/index.njk" import Button %}{{ Button({ "aria-label": name }) }}`,
    { name },
  )
