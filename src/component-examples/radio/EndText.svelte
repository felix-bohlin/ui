<script lang="ts">
  import { Radio } from "opui-css/svelte"
</script>

<Radio
  defaultChecked
  endText="Arrives in 3 to 5 days."
  name="radio-end-text"
  value="standard"
>
  Standard delivery
</Radio>
<Radio
  endText="Arrives tomorrow."
  name="radio-end-text"
  orientation="vertical"
  value="express"
>
  Express delivery
</Radio>
