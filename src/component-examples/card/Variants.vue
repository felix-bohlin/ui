<script setup lang="ts">
import { Card } from "opui-css/vue"
</script>

<template>
<Card variant="text">
  <template #content>Text</template>
</Card>

<Card variant="outlined">
  <template #content>Outlined</template>
</Card>

<Card variant="tonal">
  <template #content>Tonal</template>
</Card>

<Card variant="elevated">
  <template #content>Elevated</template>
</Card>
</template>
