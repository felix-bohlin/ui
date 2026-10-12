<script lang="ts">
  import {
    TextField,
    TextFieldControl,
    TextFieldInput,
    TextFieldLabel,
    TextFieldStartText,
  } from "opui-css/svelte"
</script>

<TextField>
  <TextFieldLabel>Name</TextFieldLabel>
  <TextFieldStartText>As it appears on your ID</TextFieldStartText>
  <TextFieldControl>
    <TextFieldInput />
  </TextFieldControl>
</TextField>
