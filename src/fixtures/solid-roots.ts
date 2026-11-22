import { hydrate } from "@solidjs/web"
import { createComponent } from "solid-js"
import SolidRoots from "./SolidRoots.solid"

const hydrateRoot = (root: HTMLElement) => {
  hydrate(() => createComponent(SolidRoots, {}), root, {
    renderId: root.dataset.solidRoot,
  })
  root.dataset.hydrated = ""
}

document.addEventListener("hydrate-roots", (event) => {
  const [first, ...rest] =
    document.querySelectorAll<HTMLElement>("[data-solid-root]")
  hydrateRoot(first)
  if ((event as CustomEvent<string>).detail === "later") {
    setTimeout(() => rest.forEach(hydrateRoot))
  } else {
    rest.forEach(hydrateRoot)
  }
})
document.documentElement.dataset.ready = ""
