<script lang="ts">
  import {
    TextField,
    TextFieldControl,
    TextFieldInput,
    TextFieldLabel,
  } from "opui-css/svelte"
</script>

<TextField>
  <TextFieldLabel>Numeric</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput placeholder="Numeric" type="numeric" />
  </TextFieldControl>
</TextField>
