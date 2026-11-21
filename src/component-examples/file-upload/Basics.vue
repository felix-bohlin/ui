<script setup lang="ts">
import { FileUpload } from "opui-css/vue"
</script>

<template>
  <FileUpload
    accept="image/*"
    description="Or drop them here. PNG or JPG."
    label="Choose photos"
    multiple
  />
</template>
