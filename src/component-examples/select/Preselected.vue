<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select
    :items="[
      { label: 'Backing vocals', value: 'backing-vocals' },
      { label: 'Bass', value: 'bass' },
      { label: 'Tambourine', value: 'tambourine' },
    ]"
    label="Role"
    value="bass"
  />

  <Select
    :items="[
      { label: 'Brad and the Brads', value: 'brad-and-the-brads' },
      { label: 'Low End Theory', selected: true, value: 'low-end-theory' },
      { label: 'The Low Enders', value: 'the-low-enders' },
    ]"
    label="Band"
  />
</template>
