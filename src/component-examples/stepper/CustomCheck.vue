<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="2"
    :items="[
      { href: '#cart', label: 'Cart' },
      { href: '#shipping', label: 'Shipping' },
      { href: '#payment', label: 'Payment' },
      { href: '#review', label: 'Review' },
    ]"
    label="Checkout steps"
    ><template #check
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" /></svg></template
  ></Stepper>
</template>
