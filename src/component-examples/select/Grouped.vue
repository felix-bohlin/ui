<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Grouped">
    <option value="">Select car</option>
    <div role="group">
      <label class="ui-text">Swedish cars</label>
      <option>Volvo</option>
      <option>SAAB</option>
    </div>
    <div role="group">
      <label class="ui-text">French cars</label>
      <option>Renault</option>
      <option>Citroën</option>
    </div>
  </Select>
</template>
