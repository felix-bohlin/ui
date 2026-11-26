import { beforeAll, expect, test } from "vitest"
import * as Vue from "vue"
import { compileComponent } from "../../scripts/build-components.mjs"
import { loadApis } from "../../scripts/component-reader.mjs"
import { useBound, useInputAttrs } from "../../packages/opui/components/vue"
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
  attrs.value = { class: "wide", placeholder: "Search", style: "color: red" }
  await Vue.nextTick()
  expect(html(root)).toBe(
    '<main><label><input placeholder="Search"></input></label></main>',
  )
})

test("useBound follows a parent that starts or stops passing a v-model to the same instance", async () => {
  const Control = Vue.defineComponent({
    emits: ["update:modelValue"],
    props: { modelValue: { default: undefined, type: Boolean } },
    setup: () => {
      const bound = useBound()
      return () => Vue.h("span", bound.value ? "bound" : "unbound")
    },
  })
  const attrs = Vue.ref<Record<string, unknown>>({})
  const root = node("main")
  createApp({
    setup: () => () => Vue.h(Control, attrs.value),
  }).mount(root)
  expect(html(root)).toBe("<main><span>unbound</span></main>")
  attrs.value = { modelValue: true, "onUpdate:modelValue": () => {} }
  await Vue.nextTick()
  expect(html(root)).toBe("<main><span>bound</span></main>")
  attrs.value = {}
  await Vue.nextTick()
  expect(html(root)).toBe("<main><span>unbound</span></main>")
})

test("a compiled Vue component passes on an attribute that arrives after a mount with none", async () => {
  const { outputs } = await compileComponent(
    '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, "aria-label": ariaLabel, ...rest } = Astro.props\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <input aria-label={ariaLabel} />\n</div>\n',
    "packages/opui/components/Sample/Sample.astro",
  )
  const source = outputs.get("packages/opui/components/Sample/Sample.vue")
  expect(source).toContain("const restAttrs = computed(")
  const Sample = clientComponent(source!, "type Props = {}")
  const { attrs, root } = mountWith(Sample)
  expect(html(root)).toBe(
    '<main><div class="ui-sample"><input></input></div></main>',
  )
  attrs.value = {
    "aria-label": "Rating",
    class: "wide",
    title: "Your rating",
  }
  await Vue.nextTick()
  expect(html(root)).toBe(
    '<main><div class="ui-sample wide" title="Your rating"><input aria-label="Rating"></input></div></main>',
  )
}, 15_000)
