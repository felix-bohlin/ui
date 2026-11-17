import { getRequestEvent, isServer } from "@solidjs/web"
import { onSettled, type Component } from "solid-js"
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
  const component = pathname().slice(1)
  const examples = all.filter(({ slug }) => slug === component)

  onSettled(() => {
    document.documentElement.dataset.hydrated = ""
  })

  return (
    <>
      <nav>
        {slugs.map((slug) => (
          <a href={`/${slug}`}>{slug}</a>
        ))}
      </nav>
      <main>
        {examples.map(({ Component, name }) => (
          <div data-example={`${component}/${name}`}>
            <Component />
          </div>
        ))}
      </main>
    </>
  )
}
