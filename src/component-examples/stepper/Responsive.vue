<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <div class="stepper-resize">
    <Stepper
      :current="2"
      :items="[
        { href: '#cart', label: 'Cart' },
        { href: '#shipping', label: 'Shipping' },
        { href: '#payment', label: 'Payment' },
        { href: '#review', label: 'Review' },
      ]"
      label="Checkout steps"
    />
  </div>
</template>

<style>
.stepper-resize {
  border: var(--border-width) dashed var(--border-color);
  border-radius: var(--border-radius);
  max-inline-size: 36rem;
  min-inline-size: 12rem;
  overflow: hidden;
  padding: var(--size-3);
  resize: horizontal;
}
</style>
