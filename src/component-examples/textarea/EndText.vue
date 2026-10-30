<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea endText="Supporting text" label="Label" placeholder="Default" />
  <Textarea
    endText="Supporting text"
    label="Label"
    placeholder="Filled"
    variant="filled"
  />
</template>
