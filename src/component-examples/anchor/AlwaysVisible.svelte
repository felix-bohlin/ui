<script lang="ts">
  import { Anchor } from "@opui/svelte"
</script>

<Anchor>
  <button>Hover me</button>
  {#snippet anchored()}
    <span
      style="background: var(--surface-2); padding: var(--size-2) var(--size-3); border-radius: var(--radius-2); box-shadow: var(--shadow-3);"
      >Floating content</span
    >
  {/snippet}
</Anchor>
