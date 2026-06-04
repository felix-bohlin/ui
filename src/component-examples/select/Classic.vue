<script setup lang="ts">
import { ClassicSelect } from "opui-css/vue"
</script>

<template>
  <ClassicSelect label="Label">
    <option value="">-</option>
    <option>Option</option>
    <option>Option</option>
  </ClassicSelect>

  <ClassicSelect label="Label" variant="filled">
    <option value="">-</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </ClassicSelect>
</template>
