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
</template>
