<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>

<template>
  <Progress value="25" max="100" variant="default" />
  <Progress value="50" max="100" variant="filled" />
  <Progress value="75" max="100" variant="tonal" />
</template>
