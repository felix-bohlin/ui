import type { ReactNode } from "react"
import type { Component as SolidComponent } from "solid-js"
import type { Component as SvelteComponent } from "svelte"
import type { Component as VueComponent } from "vue"

type Side = "Native" | "Opui"

const SIDES = ["Native", "Opui"] as const

const native =
  <Modules>(
    load: (side: Side) => Promise<Modules>,
    hydrateSide: (modules: Modules, root: HTMLElement, side: Side) => void,
  ) =>
  async (root: HTMLElement) => {
    const released = new URLSearchParams(location.search).has("hold")
      ? new Promise((resolve) =>
          document.addEventListener("hydrate-native", resolve, { once: true }),
        )
      : undefined
    const modules = await Promise.all(SIDES.map(load))
    await released
    SIDES.forEach((side, index) =>
      hydrateSide(
        modules[index]!,
        root.querySelector<HTMLElement>(`[data-example="native/${side}"]`)!,
        side,
      ),
    )
    document.documentElement.dataset.hydrated = ""
  }

const fixtures: Record<string, (root: HTMLElement) => Promise<unknown>> = {
  "react-models": async (root) => {
    const [{ createElement }, { createRoot }, { default: Models }] =
      await Promise.all([
        import("react"),
        import("react-dom/client"),
        import("./models.react.tsx"),
      ])
    createRoot(root).render(createElement(Models))
  },
  "react-native": native(
    (side) =>
      Promise.all([
        import("react"),
        import("react-dom"),
        import("react-dom/client"),
        import(`../../tests/apps/native/${side}.react.tsx`) as Promise<{
          default: () => ReactNode
        }>,
      ]),
    ([{ createElement }, { flushSync }, { hydrateRoot }, Side], root, side) =>
      flushSync(() =>
        hydrateRoot(root, createElement(Side.default), {
          identifierPrefix: `${side}-`,
        }),
      ),
  ),
  "solid-models": async (root) => {
    const [{ render }, { createComponent }, { default: Models }] =
      await Promise.all([
        import("@solidjs/web"),
        import("solid-js"),
        import("./models.solid.tsx"),
      ])
    render(() => createComponent(Models, {}), root)
  },
  "solid-native": native(
    (side) =>
      Promise.all([
        import("@solidjs/web"),
        import("solid-js"),
        import(`../../tests/apps/native/${side}.solid.tsx`) as Promise<{
          default: SolidComponent
        }>,
      ]),
    ([{ hydrate }, { createComponent }, Side], root, side) =>
      hydrate(() => createComponent(Side.default, {}), root, {
        renderId: `${side}-`,
      }),
  ),
  "solid-roots": () => import("./solid-roots"),
  "svelte-models": async (root) => {
    const [{ mount }, { default: Models }] = await Promise.all([
      import("svelte"),
      import("./models.svelte"),
    ])
    mount(Models, { target: root })
  },
  "svelte-native": native(
    (side) =>
      Promise.all([
        import("svelte"),
        import(`../../tests/apps/native/${side}.svelte`) as Promise<{
          default: SvelteComponent
        }>,
      ]),
    ([{ hydrate }, Side], root) => hydrate(Side.default, { target: root }),
  ),
  "vue-models": async (root) => {
    const [{ createApp }, { default: Models }] = await Promise.all([
      import("vue"),
      import("./models.vue"),
    ])
    createApp(Models).mount(root)
  },
  "vue-native": native(
    (side) =>
      Promise.all([
        import("vue"),
        import(`../../tests/apps/native/${side}.vue`) as Promise<{
          default: VueComponent
        }>,
      ]),
    ([{ createSSRApp }, Side], root, side) => {
      const app = createSSRApp(Side.default)
      app.config.idPrefix = side
      app.mount(root)
    },
  ),
}

const fixture = document.body.dataset.fixture ?? ""

fixtures[fixture]?.(document.getElementById(fixture)!)
