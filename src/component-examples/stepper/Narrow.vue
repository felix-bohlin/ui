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
  <Stepper
    aria-label="Checkout steps"
    :current="2"
    :items="items"
    style="max-inline-size: 28rem"
  />
  <Stepper
    aria-label="Checkout steps"
    :current="2"
    :items="items"
    orientation="horizontal"
    style="max-inline-size: 28rem"
  />
</template>
