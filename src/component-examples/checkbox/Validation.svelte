<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<div class="example-row">
  <Checkbox name="checkbox-validation" required>Default</Checkbox>
  <Checkbox name="checkbox-validation" orientation="vertical" required
    >Stack</Checkbox
  >
</div>
<div class="example-row">
  <Checkbox checked error name="checkbox-validation">
    Default
    {#snippet endText()}Check yourself{/snippet}
  </Checkbox>
  <Checkbox error name="checkbox-validation" orientation="vertical">
    Stack
    {#snippet endText()}Before you wreck yourself{/snippet}
  </Checkbox>
</div>
