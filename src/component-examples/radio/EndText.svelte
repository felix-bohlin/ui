<script lang="ts">
  import { Radio } from "opui-css/svelte"
</script>

<Radio name="radio-end-text" value="default" checked endText="Supporting text">
  Default
</Radio>
<Radio
  name="radio-end-text"
  value="stack"
  orientation="vertical"
  endText="Supporting text"
>
  Stack
</Radio>
