<script setup lang="ts">
import { Stepper } from "opui-css/vue"

const items = [
  { href: "#", label: "Varukorg" },
  { href: "#", label: "Leverans", state: "error" as const },
  { href: "#", label: "Betalning" },
  { href: "#", label: "Granska" },
]
</script>

<template>
  <Stepper
    aria-label="Kassans steg"
    completeLabel=", klar"
    :current="2"
    errorLabel=", fel"
    :items="items"
    lang="sv"
  />
</template>
