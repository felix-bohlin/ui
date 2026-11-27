<script setup lang="ts">
import { Breadcrumb } from "opui-css/vue"

const deepFive = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { href: "#", label: "Five-string" },
  { href: "#", label: "Fretless" },
  { label: "Deep Five" },
]

const nightFive = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { href: "#", label: "Five-string" },
  { href: "#", label: "Fretless" },
  { label: "Night Five" },
]

const mossFive = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { href: "#", label: "Five-string" },
  { href: "#", label: "Fretless" },
  { label: "Moss Five" },
]
</script>

<template>
  <Breadcrumb
    aria-label="Deep Five breadcrumb"
    :items="deepFive"
    overflow="wrap"
    style="max-inline-size: 20rem"
  />
  <Breadcrumb
    aria-label="Night Five breadcrumb"
    :items="nightFive"
    overflow="scroll"
    style="max-inline-size: 20rem"
  />
  <Breadcrumb
    aria-label="Moss Five breadcrumb"
    :items="mossFive"
    overflow="shrink"
    style="max-inline-size: 20rem"
  />
</template>
