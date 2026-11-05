<script lang="ts">
  import type { Component } from "svelte"
  import { page } from "$app/state"

  const modules = import.meta.glob<Component>("../../lib/examples/*/*.svelte", {
    eager: true,
    import: "default",
  })

  const component = $derived(page.params.component)
  const examples = $derived(
    Object.entries(modules)
      .map(([path, example]) => {
        const [slug, file] = path.split("/").slice(-2)
        return { example, name: file?.slice(0, -".svelte".length), slug }
      })
      .filter(({ slug }) => slug === component),
  )
</script>

{#each examples as { example: Example, name } (name)}
  <div data-example="{component}/{name}">
    <Example />
  </div>
{/each}
