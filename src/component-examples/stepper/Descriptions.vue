<script setup lang="ts">
import { Stepper } from "opui-css/vue"

const items = [
  { description: "Name and email", label: "Account" },
  { description: "Free or Pro", label: "Plan" },
  { description: "Card or invoice", label: "Payment" },
  { description: "Start building", label: "Done" },
]
</script>

<template>
  <Stepper aria-label="Sign-up steps" :current="1" :items="items" />
</template>
