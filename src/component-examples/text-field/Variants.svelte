<script lang="ts">
  import {
    TextField,
    TextFieldControl,
    TextFieldInput,
    TextFieldLabel,
  } from "opui-css/svelte"
</script>

<TextField>
  <TextFieldLabel>Outlined</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput placeholder="Placeholder" />
  </TextFieldControl>
</TextField>
<TextField variant="filled">
  <TextFieldLabel>Filled</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput placeholder="Placeholder" />
  </TextFieldControl>
</TextField>
