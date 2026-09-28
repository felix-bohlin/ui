<script lang="ts">
  import { Card } from "@opui/svelte"
  import { Button } from "@opui/svelte"
</script>

<Card variant="elevated" class="anatomy">
  {#snippet header()}
    <p>Overline</p>
    <h2 class="ui-h3">Headline</h2>
    <p>Subhead</p>
  {/snippet}
  {#snippet content()}
    Explain more about the topic shown in the headline and subhead through
    supporting text.
  {/snippet}
  {#snippet actions()}
    <Button>Share</Button>
    <Button>Learn more</Button>
  {/snippet}
</Card>
