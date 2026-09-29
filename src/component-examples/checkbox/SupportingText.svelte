<script lang="ts">
  import { Checkbox } from "@opui/svelte"
</script>

<Checkbox name="checkbox">
  Default
  {#snippet endText()}
    Supporting text
  {/snippet}
</Checkbox>
<Checkbox stack name="checkbox">
  Stack
  {#snippet endText()}
    Supporting text
  {/snippet}
</Checkbox>
