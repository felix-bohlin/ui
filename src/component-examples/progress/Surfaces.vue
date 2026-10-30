<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>

<template>
  <Progress aria-label="Storage used" max="100" value="25" variant="filled" />
  <Progress aria-label="Memory used" max="100" value="75" variant="tonal" />
</template>
