<script setup lang="ts">
import { FileUpload } from "opui-css/vue"
</script>

<template>
  <FileUpload
    accept="image/*"
    description="Or drop them here. PNG or JPG."
    :items="[
      {
        label: 'lou-headstock.png',
        preview: '/photos/lou-headstock.png',
        state: 'done',
        value: 'lou',
      },
      {
        description: 'The connection dropped. Remove it and choose it again.',
        label: 'percy-groove.png',
        preview: '/photos/percy-groove.png',
        state: 'error',
        value: 'percy',
      },
    ]"
    label="Choose photos"
    multiple
    status="1 photo didn't upload."
  />
</template>
