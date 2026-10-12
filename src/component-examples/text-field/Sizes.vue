<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField size="x-small">
    <TextFieldLabel>x-small</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
  <TextField size="small">
    <TextFieldLabel>Small</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
  <TextField>
    <TextFieldLabel>Default</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
  <TextField size="large">
    <TextFieldLabel>Large</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Placeholder" />
    </TextFieldControl>
  </TextField>
</template>
