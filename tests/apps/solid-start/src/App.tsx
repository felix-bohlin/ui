import { getRequestEvent, isServer } from "@solidjs/web"
import {
  createMemo,
  createSignal,
  For,
  onSettled,
  type Component,
} from "solid-js"
import slugs from "./examples/slugs.json"
import "./index.css"

const modules = import.meta.glob<Component>("./examples/*/*.solid.tsx", {
  eager: true,
  import: "default",
})

const all = Object.entries(modules).map(([path, Component]) => {
  const [slug, file] = path.split("/").slice(-2)
  return { Component, name: file?.slice(0, -".solid.tsx".length), slug }
})

const pathname = () =>
  isServer
    ? new URL(getRequestEvent()!.request.url).pathname
    : location.pathname

export default function App() {
  const [path, setPath] = createSignal(pathname())
  const examples = createMemo(() =>
    all.filter(({ slug }) => slug === path().slice(1)),
  )
  const navigate = (
    event: MouseEvent & { currentTarget: HTMLAnchorElement },
  ) => {
    event.preventDefault()
    history.pushState(null, "", event.currentTarget.href)
    setPath(location.pathname)
  }

  onSettled(() => {
    document.documentElement.dataset.hydrated = ""
    const follow = () => setPath(location.pathname)
    addEventListener("popstate", follow)
    return () => removeEventListener("popstate", follow)
  })

  return (
    <>
      <nav>
        {slugs.map((slug) => (
          <a href={`/${slug}`} onClick={navigate}>
            {slug}
          </a>
        ))}
      </nav>
      <main>
        <For each={examples()}>
          {(example) => (
            <div data-example={`${example.slug}/${example.name}`}>
              <example.Component />
            </div>
          )}
        </For>
      </main>
    </>
  )
}
