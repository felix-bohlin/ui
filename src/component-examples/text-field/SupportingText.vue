<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldEndText,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Label</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Outlined" />
    </TextFieldControl>
    <TextFieldEndText>Supporting text</TextFieldEndText>
  </TextField>
</template>
