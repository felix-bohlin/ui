<script setup lang="ts">
import { Breadcrumb } from "opui-css/vue"

const items = [
  { href: "#", label: "Groups" },
  { href: "#", label: "Low End Society" },
  { href: "#", label: "Events" },
  { label: "Friday jam night" },
]
</script>

<template>
  <Breadcrumb aria-label="Event breadcrumb" :items="items" />
</template>
