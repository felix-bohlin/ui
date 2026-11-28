<script lang="ts">
  import Anchor from "../../../packages/opui/components/Anchor/Anchor.svelte"
  import AnchorContent from "../../../packages/opui/components/Anchor/AnchorContent.svelte"

  let { hover }: { hover?: boolean } = $props()
</script>

{#if hover}
  <Anchor id="card" trigger="hover">
    <a href="/repo" interestfor="card">Repo</a>
    <AnchorContent id="own" popover="manual">Card</AnchorContent>
  </Anchor>
{:else}
  <Anchor>
    <button popovertarget="own">Repo</button>
    <AnchorContent id="own" popover="manual">Card</AnchorContent>
  </Anchor>
{/if}
