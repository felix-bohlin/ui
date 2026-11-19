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
        label: 'percy-groove.png',
        preview: '/photos/percy-groove.png',
        progress: 0.6,
        state: 'uploading',
        value: 'percy',
      },
      {
        description: 'Waiting for its turn',
        label: 'holly-humbucker.png',
        state: 'queued',
        value: 'holly',
      },
    ]"
    label="Choose photos"
    multiple
  />
</template>
