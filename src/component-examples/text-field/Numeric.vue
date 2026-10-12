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
    <TextFieldLabel>Numeric</TextFieldLabel>
    <TextFieldControl>
      <TextFieldInput placeholder="Numeric" type="numeric" />
    </TextFieldControl>
  </TextField>
</template>
