<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<Checkbox name="checkbox-supporting-text">
  Default
  {#snippet endText()}Supporting text{/snippet}
</Checkbox>
<Checkbox stack name="checkbox-supporting-text">
  Stack
  {#snippet endText()}Supporting text{/snippet}
</Checkbox>
