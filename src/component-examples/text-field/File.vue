<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field for="text-field-file-1" label="Avatar">
    <input accept="image/*" id="text-field-file-1" type="file" />
  </Field>
  <Field for="text-field-file-2" label="Attachments" variant="filled">
    <input id="text-field-file-2" type="file" />
  </Field>
</template>
