import { beforeAll, expect, test } from "vitest"
import * as Vue from "vue"
import { compileComponent } from "../../scripts/build-components.mjs"
import { loadApis } from "../../scripts/component-reader.mjs"
import { useInputAttrs } from "../../packages/opui/components/vue"
import { clientComponent, createApp, html, node } from "./vue-client"

beforeAll(async () => {
  await loadApis()
})

const mountWith = (component: Vue.Component) => {
  const attrs = Vue.ref<Record<string, string>>({})
  const root = node("main")
  createApp({
    setup: () => () => Vue.h(component, attrs.value),
  }).mount(root)
  return { attrs, root }
}

test("useInputAttrs passes on an attribute that arrives after a mount with none", async () => {
  const Field = Vue.defineComponent({
    inheritAttrs: false,
    setup: () => {
      const attrs = useInputAttrs()
      return () => Vue.h("label", [Vue.h("input", attrs.value)])
    },
  })
  const { attrs, root } = mountWith(Field)
  expect(html(root)).toBe("<main><label><input></input></label></main>")
  attrs.value = { placeholder: "Search", style: "color: red" }
  await Vue.nextTick()
  expect(html(root)).toBe(
    '<main><label><input placeholder="Search"></input></label></main>',
  )
})

test("a compiled Vue component passes on an attribute that arrives after a mount with none", async () => {
  const { outputs } = await compileComponent(
    '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, "aria-label": ariaLabel, ...rest } = Astro.props\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <input aria-label={ariaLabel} />\n</div>\n',
    "packages/opui/components/Sample/Sample.astro",
  )
  const source = outputs.get("packages/opui/components/Sample/Sample.vue")
  expect(source).toContain("const restAttrs = computed(")
  const Sample = clientComponent(source!, "type Props = { class?: string }")
  const { attrs, root } = mountWith(Sample)
  expect(html(root)).toBe(
    '<main><div class="ui-sample"><input></input></div></main>',
  )
  attrs.value = { "aria-label": "Rating", title: "Your rating" }
  await Vue.nextTick()
  expect(html(root)).toBe(
    '<main><div class="ui-sample" title="Your rating"><input aria-label="Rating"></input></div></main>',
  )
}, 15_000)
