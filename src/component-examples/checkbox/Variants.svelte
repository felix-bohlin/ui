<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<Checkbox checked name="checkbox-variants" hideLabel>Checked</Checkbox>
<Checkbox name="checkbox-variants" hideLabel>Unchecked</Checkbox>
<Checkbox indeterminate name="checkbox-variants" hideLabel
  >Indeterminate</Checkbox
>
<Checkbox disabled name="checkbox-variants" hideLabel>Disabled</Checkbox>
<Checkbox checked disabled name="checkbox-variants" hideLabel
  >Checked and disabled</Checkbox
>
