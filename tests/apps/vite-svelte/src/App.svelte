<script lang="ts">
  import { onMount, type Component } from "svelte"
  import slugs from "./examples/slugs.json"

  const modules = import.meta.glob<Component>("./examples/*/*.svelte", {
    eager: true,
    import: "default",
  })

  const component = location.pathname.slice(1)
  const examples = Object.entries(modules)
    .map(([path, example]) => {
      const [slug, file] = path.split("/").slice(-2)
      return { example, name: file?.slice(0, -".svelte".length), slug }
    })
    .filter(({ slug }) => slug === component)

  onMount(() => {
    document.documentElement.dataset.hydrated = ""
  })
</script>

<nav>
  {#each slugs as slug (slug)}
    <a href="/{slug}">{slug}</a>
  {/each}
</nav>
<main>
  {#each examples as { example: Example, name } (name)}
    <div data-example="{component}/{name}">
      <Example />
    </div>
  {/each}
</main>
