<script lang="ts">
  import { Button, Card } from "opui-css/svelte"
</script>

<Card variant="outlined">
  {#snippet header()}
    <h3><a class="ui-card-link" href="#clickable">Pricing</a></h3>
  {/snippet}
  {#snippet content()}
    Plans for any team. Click anywhere on the card.
  {/snippet}
</Card>

<Card variant="outlined">
  {#snippet header()}
    <h3><a class="ui-card-link" href="#clickable">Changelog</a></h3>
  {/snippet}
  {#snippet content()}Every release in one place.{/snippet}
  {#snippet actions()}
    <Button>Subscribe</Button>
  {/snippet}
</Card>
