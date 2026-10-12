<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
  TextFieldStartText,
} from "opui-css/vue"
</script>

<template>
  <TextField>
    <TextFieldLabel>Name</TextFieldLabel>
    <TextFieldStartText>As it appears on your ID</TextFieldStartText>
    <TextFieldControl>
      <TextFieldInput />
    </TextFieldControl>
  </TextField>
</template>
