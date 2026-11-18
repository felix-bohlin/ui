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
  "solid-models": async (root) => {
    const [{ render }, { createComponent }, { default: Models }] =
      await Promise.all([
        import("@solidjs/web"),
        import("solid-js"),
        import("./models.solid.tsx"),
      ])
    render(() => createComponent(Models, {}), root)
  },
  "solid-roots": () => import("./solid-roots"),
  "svelte-models": async (root) => {
    const [{ mount }, { default: Models }] = await Promise.all([
      import("svelte"),
      import("./models.svelte"),
    ])
    mount(Models, { target: root })
  },
  "vue-models": async (root) => {
    const [{ createApp }, { default: Models }] = await Promise.all([
      import("vue"),
      import("./models.vue"),
    ])
    createApp(Models).mount(root)
  },
}

const fixture = document.body.dataset.fixture ?? ""

fixtures[fixture]?.(document.getElementById(fixture)!)
