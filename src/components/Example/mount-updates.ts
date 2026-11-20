import { createElement, type ComponentType } from "react"
import { flushSync as flushReact } from "react-dom"
import { createRoot } from "react-dom/client"
import { render as renderSolid } from "@solidjs/web"
import {
  createComponent,
  createStore,
  flush as flushSolid,
  type Component as SolidComponent,
} from "solid-js"
import {
  createRawSnippet,
  flushSync as flushSvelte,
  mount as mountSvelte,
  unmount as unmountSvelte,
  type Component as SvelteComponent,
} from "svelte"
import {
  createApp,
  h,
  nextTick,
  ref,
  type Component as VueComponent,
} from "vue"
import UpdateHost from "./UpdateHost.svelte"

export type UpdateSlot = { fn: boolean; prop: string; slot: string }

export type UpdateState = {
  props: Record<string, unknown>
  slots: UpdateSlot[]
}

type Mounted = {
  set: (state: UpdateState) => Promise<void>
  unmount: () => void
}

type Mount = (
  load: () => Promise<unknown>,
  target: HTMLElement,
  state: UpdateState,
  id: string,
) => Promise<Mounted>

const TEXT = "Text"

const loaders = {
  react: import.meta.glob("../../../packages/opui/components/*/*.react.tsx"),
  solid: import.meta.glob("../../../packages/opui/components/*/*.solid.tsx"),
  svelte: import.meta.glob("../../../packages/opui/components/*/*.svelte"),
  vue: import.meta.glob("../../../packages/opui/components/*/*.vue"),
}

type UpdateFramework = keyof typeof loaders

const slotProps = (slots: UpdateSlot[], value: (slot: UpdateSlot) => unknown) =>
  Object.fromEntries(slots.map((slot) => [slot.prop, value(slot)]))

const reactProps = ({ props, slots }: UpdateState) => ({
  ...props,
  ...slotProps(slots, ({ fn }) => (fn ? () => TEXT : TEXT)),
})

const solidProps = reactProps

const svelteProps = ({ props, slots }: UpdateState) => ({
  ...props,
  ...slotProps(slots, () =>
    createRawSnippet(() => ({ render: () => `<span>${TEXT}</span>` })),
  ),
})

const vueSlots = ({ slots }: UpdateState) =>
  Object.fromEntries(slots.map(({ slot }) => [slot, () => TEXT]))

const mounts: Record<UpdateFramework, Mount> = {
  react: async (load, target, state, id) => {
    const { default: Component } = (await load()) as {
      default: ComponentType<Record<string, unknown>>
    }
    const root = createRoot(target, { identifierPrefix: `${id}-` })
    const draw = (next: UpdateState) =>
      flushReact(() => root.render(createElement(Component, reactProps(next))))
    draw(state)
    return {
      set: async (next) => draw(next),
      unmount: () => root.unmount(),
    }
  },
  solid: async (load, target, state) => {
    const { default: Component } = (await load()) as {
      default: SolidComponent<Record<string, unknown>>
    }
    const [props, setProps] = createStore(solidProps(state))
    const dispose = renderSolid(() => createComponent(Component, props), target)
    flushSolid()
    return {
      set: async (next) => {
        const values = solidProps(next)
        setProps((draft) => {
          for (const key of Object.keys(draft)) {
            if (!(key in values)) delete draft[key]
          }
          Object.assign(draft, values)
        })
        flushSolid()
      },
      unmount: dispose,
    }
  },
  svelte: async (load, target, state) => {
    const { default: Component } = (await load()) as {
      default: SvelteComponent<Record<string, unknown>>
    }
    let update: (next: Record<string, unknown>) => void = () => {}
    const host = mountSvelte(UpdateHost, {
      props: {
        component: Component,
        initial: svelteProps(state),
        register: (set) => {
          update = set
        },
      },
      target,
    })
    flushSvelte()
    return {
      set: async (next) => {
        update(svelteProps(next))
        flushSvelte()
      },
      unmount: () => {
        void unmountSvelte(host)
      },
    }
  },
  vue: async (load, target, state, id) => {
    const { default: Component } = (await load()) as { default: VueComponent }
    const current = ref(state)
    const app = createApp({
      render: () => h(Component, current.value.props, vueSlots(current.value)),
    })
    app.config.idPrefix = id
    app.mount(target)
    return {
      set: async (next) => {
        current.value = next
        await nextTick()
      },
      unmount: () => app.unmount(),
    }
  },
}

const FORM_STATE = new Set(["input", "option", "select", "textarea"])

const settle = () =>
  new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve)))

const snapshot = (target: HTMLElement) => {
  const live = [...target.querySelectorAll<HTMLElement>("*")]
  const copy = target.cloneNode(true) as HTMLElement
  const copies = [...copy.querySelectorAll<HTMLElement>("*")]
  const ids = new Map(
    live
      .filter((element) => element.id)
      .map((element, index) => [element.id, `id-${index}`]),
  )
  copies.forEach((element, index) => {
    const original = live[index]
    if (FORM_STATE.has(element.localName)) {
      element.removeAttribute("checked")
      element.removeAttribute("selected")
      element.removeAttribute("value")
      if (element.localName === "textarea") element.textContent = ""
      if (original instanceof HTMLOptionElement) {
        element.setAttribute("data-live-selected", String(original.selected))
      }
      if (original instanceof HTMLInputElement) {
        element.setAttribute("data-live-checked", String(original.checked))
      }
      if (
        original instanceof HTMLInputElement ||
        original instanceof HTMLSelectElement ||
        original instanceof HTMLTextAreaElement
      ) {
        element.setAttribute("data-live-value", original.value)
      }
    }
    for (const { name, value } of element.attributes) {
      const mapped = value
        .split(" ")
        .map((token) => ids.get(token) ?? token)
        .join(" ")
      if (mapped !== value) element.setAttribute(name, mapped)
    }
  })
  return copy.innerHTML.replace(/<!--[\s\S]*?-->/g, "")
}

let mounted = 0

const render = async (
  framework: UpdateFramework,
  component: string,
  first: UpdateState,
  then?: UpdateState,
) => {
  const extension = {
    react: ".react.tsx",
    solid: ".solid.tsx",
    svelte: ".svelte",
    vue: ".vue",
  }[framework]
  const load = Object.entries(loaders[framework]).find(([path]) =>
    path.endsWith(`/${component}${extension}`),
  )?.[1]
  if (!load) return undefined
  const target = document.createElement("div")
  document.querySelector("main")!.append(target)
  mounted += 1
  const handle = await mounts[framework](load, target, first, `m${mounted}`)
  await settle()
  if (then) {
    await handle.set(then)
    await settle()
  }
  const markup = snapshot(target)
  handle.unmount()
  target.remove()
  return markup
}

export const updates = { render }

export type UpdatesWindow = Window & { opuiUpdates: typeof updates }

;(window as unknown as UpdatesWindow).opuiUpdates = updates
