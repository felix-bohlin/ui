<script setup lang="ts">
import { Breadcrumb } from "opui-css/vue"

const fogFive = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { href: "#", label: "Five-string" },
  { href: "#", label: "Fretless" },
  { label: "Fog Five" },
]

const groupEvent = [
  { href: "#", label: "Groups" },
  { href: "#", label: "Low End Society" },
  { label: "Friday jam night" },
]
</script>

<template>
  <Breadcrumb
    aria-label="Fog Five breadcrumb"
    :items="fogFive"
    menuLabel="More levels"
    overflow="menu"
  />
  <Breadcrumb
    aria-label="Jam night breadcrumb"
    :items="groupEvent"
    menuLabel="More levels"
    overflow="menu"
  />
</template>
