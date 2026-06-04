<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Select label="Label" required>
      <option value="">-</option>
      <option>Pick me!</option>
      <option>No me!!</option>
      <option>Come on!</option>
    </Select>

    <Select label="Label" variant="filled" required>
      <option value="">-</option>
      <option>Pick me!</option>
      <option>No me!!</option>
      <option>Come on!</option>
    </Select>
  </div>

  <div class="example-row">
    <Select label="Label" error endText="Supporting text">
      <option value="">-</option>
      <option selected>Wrong option</option>
      <option>Also wrong!</option>
      <option>Nothing's right!</option>
    </Select>

    <Select label="Label" variant="filled" error endText="Supporting text">
      <option value="">-</option>
      <option selected>Wrong option</option>
      <option>Also wrong!</option>
      <option>Nothing's right!</option>
    </Select>
  </div>
</template>
