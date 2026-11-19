<script setup lang="ts">
import { FileUpload } from "opui-css/vue"
</script>

<template>
  <FileUpload
    accept="image/*"
    description="Eller släpp dem här. PNG eller JPG."
    :items="[
      {
        label: 'lou-headstock.png',
        preview: '/photos/lou-headstock.png',
        progress: 0.3,
        state: 'uploading',
        value: 'lou',
      },
    ]"
    label="Välj foton"
    lang="sv"
    multiple
    progressLabel="Laddar upp {label}"
    removeLabel="Ta bort {label} från listan"
  />
</template>
