<script lang="ts">
  import {
    TextField,
    TextFieldControl,
    TextFieldFooter,
    TextFieldHeader,
    TextFieldInput,
    TextFieldLabel,
  } from "opui-css/svelte"
</script>

<TextField>
  <TextFieldLabel>Username</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput placeholder="Enter your name" />
    <TextFieldHeader>Full Name</TextFieldHeader>
  </TextFieldControl>
</TextField>

<TextField>
  <TextFieldLabel>Tagline</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput placeholder="A short description" />
    <TextFieldFooter>0 / 80</TextFieldFooter>
  </TextFieldControl>
</TextField>
