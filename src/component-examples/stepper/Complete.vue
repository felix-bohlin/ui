<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="4"
    :items="[
      { href: '#cart', label: 'Cart' },
      { href: '#shipping', label: 'Shipping' },
      { href: '#payment', label: 'Payment' },
      { href: '#review', label: 'Review' },
    ]"
    label="Checkout steps"
  />
</template>
