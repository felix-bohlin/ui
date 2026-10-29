<script setup lang="ts">
import { Stepper } from "opui-css/vue"

const items = [
  { href: "#", label: "Cart" },
  {
    description: "Check the postcode",
    error: true,
    href: "#",
    label: "Shipping",
  },
  { href: "#", label: "Payment" },
  { href: "#", label: "Review" },
]
</script>

<template>
  <Stepper aria-label="Checkout steps" :current="2" :items="items" />
</template>
