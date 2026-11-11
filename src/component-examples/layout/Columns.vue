<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <div class="ui-layout-container">
    <div
      class="ui-layout-columns ui-breakpoint-small"
      style="--_columns: 2fr 1fr"
    >
      <Card variant="outlined">
        <CardContent>Website relaunch: 12 open tasks</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Due March 14</CardContent>
      </Card>
    </div>
  </div>
</template>
