<script lang="ts">
  import { Radio } from "opui-css/svelte"
</script>

<Radio
  name="radio-supporting-text"
  value="default"
  checked
  endText="Supporting text"
>
  Default
</Radio>
<Radio
  name="radio-supporting-text"
  value="stack"
  stack
  endText="Supporting text"
>
  Stack
</Radio>
