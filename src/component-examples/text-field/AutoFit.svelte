<script lang="ts">
  import {
    TextField,
    TextFieldControl,
    TextFieldInput,
    TextFieldLabel,
  } from "opui-css/svelte"
</script>

<TextField autoFit>
  <TextFieldLabel>Label</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput placeholder="Auto-fit" />
  </TextFieldControl>
</TextField>
