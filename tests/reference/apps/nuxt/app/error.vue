<script setup lang="ts">
import type { NuxtError } from "#app"

const { error } = defineProps<{ error: NuxtError }>()

useHead({ title: error.statusCode === 404 ? "Not found" : "Error" })
</script>

<template>
  <NuxtLayout>
    <div
      v-if="error.statusCode === 404"
      class="app-screen"
      data-screen="not-found"
    >
      <h1>Not found</h1>
    </div>
    <div v-else class="app-screen" data-screen="error">
      <h1>{{ error.message }}</h1>
    </div>
  </NuxtLayout>
</template>
