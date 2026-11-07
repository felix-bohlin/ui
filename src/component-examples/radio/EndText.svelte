<script lang="ts">
  import { Radio } from "opui-css/svelte"
</script>

<Radio checked endText="Supporting text" name="radio-end-text" value="default">
  Default
</Radio>
<Radio
  endText="Supporting text"
  name="radio-end-text"
  orientation="vertical"
  value="stack"
>
  Stack
</Radio>
