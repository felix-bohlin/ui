<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<Checkbox name="checkbox-spread" spread>
  Accept Terms & Conditions
  {#snippet endText()}I have read and agree to the privacy policy.{/snippet}
</Checkbox>

<Checkbox name="checkbox-spread" spread required>
  Required
  {#snippet endText()}You must accept this to continue.{/snippet}
</Checkbox>

<Checkbox name="checkbox-spread" spread disabled>
  Disabled
  {#snippet endText()}This checkbox is disabled.{/snippet}
</Checkbox>

<Checkbox name="checkbox-spread" spread error>
  Invalid Checkbox
  {#snippet endText()}There is an error with this checkbox.{/snippet}
</Checkbox>
