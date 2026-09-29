<script lang="ts">
  import { Anchor } from "@opui/svelte"
  import { Button } from "@opui/svelte"
</script>

<Anchor trigger="hover" id="anchor-hover">
  <Button
    interestfor="anchor-hover"
    commandfor="anchor-hover"
    command="toggle-popover">Hover me</Button
  >
  {#snippet anchored()}
    <span><div class="ui-card ui-elevated">Tooltip content</div></span>
  {/snippet}
</Anchor>
