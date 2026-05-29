<script>
  import { Card } from "@opui/svelte"
</script>

<Card variant="text">
  {#snippet content()}
    Text
  {/snippet}
</Card>

<Card variant="outlined">
  {#snippet content()}
    Outlined
  {/snippet}
</Card>

<Card variant="tonal">
  {#snippet content()}
    Tonal
  {/snippet}
</Card>

<Card variant="elevated">
  {#snippet content()}
    Elevated
  {/snippet}
</Card>
