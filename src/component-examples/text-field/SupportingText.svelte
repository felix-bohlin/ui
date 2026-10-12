<script lang="ts">
  import {
    TextField,
    TextFieldControl,
    TextFieldEndText,
    TextFieldInput,
    TextFieldLabel,
  } from "opui-css/svelte"
</script>

<TextField>
  <TextFieldLabel>Label</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput placeholder="Outlined" />
  </TextFieldControl>
  <TextFieldEndText>Supporting text</TextFieldEndText>
</TextField>
