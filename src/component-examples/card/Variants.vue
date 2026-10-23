<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <Card>
    <CardContent>Plain</CardContent>
  </Card>

  <Card variant="transparent">
    <CardContent>Transparent</CardContent>
  </Card>

  <Card variant="outlined">
    <CardContent>Outlined</CardContent>
  </Card>

  <Card variant="tonal">
    <CardContent>Tonal</CardContent>
  </Card>

  <Card variant="elevated">
    <CardContent>Elevated</CardContent>
  </Card>
</template>
