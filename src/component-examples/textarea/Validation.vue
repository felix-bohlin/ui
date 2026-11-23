<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Textarea label="Label" placeholder="Default" required />
    <Textarea label="Label" placeholder="Filled" required filled />
  </div>

  <div class="example-row">
    <Textarea
      label="Label"
      placeholder="Default"
      endText="Only double-negatives are allowed."
      error
    />
    <Textarea
      label="Label"
      placeholder="Filled"
      endText="Only letters from the first half of the alphabet are allowed."
      error
      filled
    />
  </div>
</template>
