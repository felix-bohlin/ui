import { onSettled, type Component } from "solid-js"
import slugs from "./examples/slugs.json"

const modules = import.meta.glob<Component>("./examples/*/*.solid.tsx", {
  eager: true,
  import: "default",
})

const component = location.pathname.slice(1)
const examples = Object.entries(modules)
  .map(([path, Component]) => {
    const [slug, file] = path.split("/").slice(-2)
    return { Component, name: file?.slice(0, -".solid.tsx".length), slug }
  })
  .filter(({ slug }) => slug === component)

export default function App() {
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
