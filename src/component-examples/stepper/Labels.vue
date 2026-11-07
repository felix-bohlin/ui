<script setup lang="ts">
import { Stepper } from "opui-css/vue"

const items = [
  { href: "#", label: "Varukorg" },
  { error: true, href: "#", label: "Leverans" },
  { href: "#", label: "Betalning" },
  { href: "#", label: "Granska" },
]
</script>

<template>
  <Stepper
    aria-label="Kassans steg"
    completedLabel=", klar"
    :current="2"
    errorLabel=", fel"
    :items="items"
    lang="sv"
  />
</template>
