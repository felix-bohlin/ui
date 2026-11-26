<script setup lang="ts">
import { Breadcrumb } from "opui-css/vue"

const items = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { label: "Short scale" },
]
</script>

<template>
  <Breadcrumb
    aria-label="Breadcrumb"
    :items="items"
    style="--_separator: &quot;›&quot;"
  />
  <Breadcrumb aria-label="Breadcrumb" :items="items">
    <template #separator>
      <svg
        data-icon="chevron-right"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </template>
  </Breadcrumb>
</template>
