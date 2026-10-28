<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <div
    class="ui-layout-grid"
    style="--_max-columns: 2; --_min-inline-size: 10rem"
  >
    <Card variant="outlined">
      <CardContent>One</CardContent>
    </Card>
    <Card variant="outlined">
      <CardContent>Two</CardContent>
    </Card>
    <Card variant="outlined">
      <CardContent>Three</CardContent>
    </Card>
  </div>
</template>
