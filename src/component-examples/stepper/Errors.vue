<script setup lang="ts">
import { Stepper, StepperItem } from "opui-css/vue"
</script>

<template>
  <Stepper aria-label="Checkout steps">
    <StepperItem href="#" label="Cart" state="complete" />
    <StepperItem
      description="Check the postcode"
      href="#"
      label="Shipping"
      state="error"
    />
    <StepperItem current label="Payment" />
    <StepperItem label="Review" />
  </Stepper>
</template>
