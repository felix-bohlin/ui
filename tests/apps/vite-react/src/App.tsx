import { type ComponentType, useEffect } from "react"
import slugs from "./examples/slugs.json"

const modules = import.meta.glob<ComponentType>("./examples/*/*.react.tsx", {
  eager: true,
  import: "default",
})

const component = location.pathname.slice(1)
const examples = Object.entries(modules)
  .map(([path, Component]) => {
    const [slug, file] = path.split("/").slice(-2)
    return { Component, name: file?.slice(0, -".react.tsx".length), slug }
  })
  .filter(({ slug }) => slug === component)

export default function App() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = ""
  }, [])

  return (
    <>
      <nav>
        {slugs.map((slug) => (
          <a href={`/${slug}`} key={slug}>
            {slug}
          </a>
        ))}
      </nav>
      <main>
        {examples.map(({ Component, name }) => (
          <div data-example={`${component}/${name}`} key={name}>
            <Component />
          </div>
        ))}
      </main>
    </>
  )
}
