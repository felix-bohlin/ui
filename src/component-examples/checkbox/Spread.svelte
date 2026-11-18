<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<Checkbox name="checkbox-spread" spread value="gift-wrap">
  Gift wrap
  {#snippet endText()}Wrapped in recycled paper for €3.{/snippet}
</Checkbox>

<Checkbox name="checkbox-spread" required spread value="terms">
  I accept the terms of sale
  {#snippet endText()}Required to place the order.{/snippet}
</Checkbox>

<Checkbox disabled name="checkbox-spread" spread value="express">
  Express delivery
  {#snippet endText()}Not available for your address.{/snippet}
</Checkbox>

<Checkbox error name="checkbox-spread" spread value="age">
  I'm 18 or older
  {#snippet endText()}Confirm your age to buy this item.{/snippet}
</Checkbox>
