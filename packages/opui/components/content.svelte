<script module lang="ts">
  import type { Snippet } from "svelte"

  export { content }
</script>

{#snippet content(
  part?: string | Snippet,
)}{#if typeof part === "string"}{part}{:else if part}{@render part()}{/if}{/snippet}
