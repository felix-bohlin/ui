<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="1"
    :items="[
      { description: 'Name and email', label: 'Account' },
      { description: 'Free or Pro', label: 'Plan' },
      { description: 'Card or invoice', label: 'Payment' },
      { description: 'Start building', label: 'Done' },
    ]"
    label="Sign-up steps"
  />
</template>
