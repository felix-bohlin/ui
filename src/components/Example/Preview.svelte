<script lang="ts">
  import { onMount, type Component as ComponentType } from "svelte"

  let { slug, name } = $props()

  let Component: ComponentType | null = $state(null)

  onMount(async () => {
    // Dynamically import the component after hydration
    const mod = await import(`../../component-examples/${slug}/${name}.svelte`)
    Component = mod.default
  })
</script>

{#if Component}
  <Component />
{/if}
