const fixtures: Record<string, () => Promise<unknown>> = {
  "solid-models": () => import("./solid-models.solid.tsx"),
  "solid-roots": () => import("./solid-roots"),
}

fixtures[document.body.dataset.fixture ?? ""]?.()
