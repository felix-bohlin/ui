<script setup lang="ts">
import { Breadcrumb } from "opui-css/vue"
</script>

<template>
  <Breadcrumb
    aria-label="Short-scale breadcrumb"
    :items="[
      { href: '#', label: 'Marketplace' },
      { href: '#', label: 'Basses' },
      { label: 'Short scale' },
    ]"
    style="--_separator: &quot;›&quot;"
  />
  <Breadcrumb
    aria-label="Combo amp breadcrumb"
    :items="[
      { href: '#', label: 'Marketplace' },
      { href: '#', label: 'Amps' },
      { label: 'Combos' },
    ]"
  >
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
