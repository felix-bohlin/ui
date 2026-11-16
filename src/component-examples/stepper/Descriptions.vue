<script setup lang="ts">
import { Stepper } from "opui-css/vue"

const items = [
  { description: "Name and email", label: "Account" },
  { description: "Basic or Gold", label: "Plan" },
  { description: "Card or gig money", label: "Payment" },
  { description: "Start jamming", label: "Done" },
]
</script>

<template>
  <Stepper aria-label="Sign-up steps" :current="1" :items="items" />
</template>
