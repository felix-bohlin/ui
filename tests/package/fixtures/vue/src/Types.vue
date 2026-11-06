<script setup lang="ts">
import DeepButton from "opui-css/components/Button/Button.vue"
import { Button } from "opui-css/vue"
</script>

<template>
  <Button variant="filled">Save</Button>
  <DeepButton variant="filled">Save</DeepButton>
  <!-- @vue-expect-error -->
  <Button variant="unknown">Save</Button>
  <!-- @vue-expect-error -->
  <DeepButton variant="unknown">Save</DeepButton>
</template>
