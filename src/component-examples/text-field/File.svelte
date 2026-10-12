<script lang="ts">
  import {
    TextField,
    TextFieldControl,
    TextFieldInput,
    TextFieldLabel,
  } from "opui-css/svelte"
</script>

<TextField>
  <TextFieldLabel>Label</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput type="file" placeholder="File" />
  </TextFieldControl>
</TextField>
<TextField variant="filled">
  <TextFieldLabel>Label</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput type="file" placeholder="File" />
  </TextFieldControl>
</TextField>
