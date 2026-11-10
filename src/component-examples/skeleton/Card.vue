<script setup lang="ts">
import { Card, CardContent, Skeleton } from "opui-css/vue"
</script>

<template>
  <Card aria-busy="true" style="inline-size: 16rem">
    <Skeleton style="aspect-ratio: 16 / 9" />
    <CardContent>
      <Skeleton line />
      <Skeleton line />
      <Skeleton line />
    </CardContent>
  </Card>
</template>
