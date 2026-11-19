<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{ error: NuxtError }>()

useHead({ title: "Not found" })
</script>

<template>
  <NuxtLayout>
    <div class="app-screen" data-screen="not-found">
      <h1>Not found</h1>
    </div>
  </NuxtLayout>
</template>
