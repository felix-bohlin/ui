<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button variant="filled">Save</Button>
  <!-- @vue-expect-error -->
  <Button variant="unknown">Save</Button>
</template>
