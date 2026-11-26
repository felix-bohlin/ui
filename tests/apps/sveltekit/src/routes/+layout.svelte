<script lang="ts">
  import "../app.css"
  import { onMount } from "svelte"
  import slugs from "#lib/examples/slugs.json"

  let { children } = $props()

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
  {@render children()}
</main>
