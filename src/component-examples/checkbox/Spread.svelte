<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<Checkbox name="checkbox-spread" spread>
  Accept Terms & Conditions
  {#snippet endText()}I have read and agree to the privacy policy.{/snippet}
</Checkbox>

<Checkbox name="checkbox-spread" required spread>
  Required
  {#snippet endText()}You must accept this to continue.{/snippet}
</Checkbox>

<Checkbox disabled name="checkbox-spread" spread>
  Disabled
  {#snippet endText()}This checkbox is disabled.{/snippet}
</Checkbox>

<Checkbox error name="checkbox-spread" spread>
  Invalid Checkbox
  {#snippet endText()}Check this box to continue.{/snippet}
</Checkbox>
