<script setup lang="ts">
import { Breadcrumb } from "opui-css/vue"

const items = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { href: "#", label: "Five-string" },
  { href: "#", label: "Fretless" },
  { label: "Sandberg VM5" },
]
</script>

<template>
  <Breadcrumb
    aria-label="Breadcrumb"
    :items="items"
    overflow="wrap"
    style="max-inline-size: 20rem"
  />
  <Breadcrumb
    aria-label="Breadcrumb"
    :items="items"
    overflow="scroll"
    style="max-inline-size: 20rem"
  />
  <Breadcrumb
    aria-label="Breadcrumb"
    :items="items"
    overflow="shrink"
    style="max-inline-size: 20rem"
  />
</template>
