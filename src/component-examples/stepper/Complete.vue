<script setup lang="ts">
import { Stepper } from "opui-css/vue"

const items = [
  { href: "#", label: "Cart" },
  { href: "#", label: "Shipping" },
  { href: "#", label: "Payment" },
  { href: "#", label: "Review" },
]
</script>

<template>
  <Stepper aria-label="Checkout steps" complete :items="items" />
</template>
