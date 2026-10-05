<script lang="ts">
  import { Anchor, Button, Card } from "opui-css/svelte"
</script>

<Anchor alignment="inline-end">
  <Button variant="outlined">Export</Button>
  {#snippet anchored()}
    <Card variant="tonal" class="coach-mark">
      {#snippet content()}
        <strong>New</strong> Export to PDF and CSV from the same menu.
      {/snippet}
    </Card>
  {/snippet}
</Anchor>

<style>
  :global {
    .coach-mark {
      font-size: var(--font-size-1);
      margin-inline-start: var(--size-2);
      max-inline-size: 220px;
    }
  }
</style>
