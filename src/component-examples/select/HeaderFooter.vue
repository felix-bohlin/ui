<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Car">
    <template #header>Company cars only</template>
    <template #footer><a class="ui-link" href="#">Manage cars…</a></template>
    <option value="">-</option>
    <option>Kia EV6</option>
    <option>Volkswagen ID.4</option>
    <option>Volvo EX30</option>
  </Select>
</template>
