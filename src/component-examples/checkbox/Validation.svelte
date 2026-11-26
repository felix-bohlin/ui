<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<div class="example-row">
  <Checkbox name="checkbox-validation" required>I accept the terms</Checkbox>
  <Checkbox name="checkbox-validation" orientation="vertical" required
    >I am 18 or older</Checkbox
  >
</div>
<div class="example-row">
  <Checkbox defaultChecked error name="checkbox-validation">
    Daily backups
    {#snippet endText()}Not available on the free plan.{/snippet}
  </Checkbox>
  <Checkbox error name="checkbox-validation" orientation="vertical">
    I accept the terms
    {#snippet endText()}Accept the terms to continue.{/snippet}
  </Checkbox>
</div>
