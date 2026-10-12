<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField autoFit>
    <TextFieldLabel>Label</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Auto-fit" />
    </TextFieldControl>
  </TextField>
</template>
