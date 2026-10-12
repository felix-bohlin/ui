<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
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
</template>
