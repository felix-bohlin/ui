<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField
    accept=".pdf,.png,.jpg"
    dropZone
    endText="PDF, PNG or JPG, up to 10 MB."
    label="Receipt"
    type="file"
  />
</template>
