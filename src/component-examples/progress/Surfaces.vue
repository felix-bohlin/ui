<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>

<template>
  <Progress aria-label="Uploading" max="100" value="25" variant="filled" />
  <Progress aria-label="Importing" max="100" value="75" variant="tonal" />
</template>
