<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select
    autoFit
    :items="[
      { label: 'Citroën', value: 'citroen' },
      { label: 'Renault', value: 'renault' },
      { label: 'Volvo', value: 'volvo' },
    ]"
    label="Car"
  />
</template>
