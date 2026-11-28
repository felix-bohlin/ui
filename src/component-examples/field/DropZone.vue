<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field
    dropZone
    endText="PDF, PNG or JPG, up to 10 MB."
    for="field-drop-zone-1"
    label="Receipt"
  >
    <input
      accept=".pdf,.png,.jpg"
      aria-describedby="field-drop-zone-1-end-text"
      id="field-drop-zone-1"
      type="file"
    />
  </Field>
</template>
