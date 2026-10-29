<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <ul class="ui-layout-grid" style="--_min-inline-size: 10rem">
    <li>
      <Card variant="outlined">
        <CardContent>Design</CardContent>
      </Card>
    </li>
    <li>
      <Card variant="outlined">
        <CardContent>
          Engineering, with a longer description that wraps onto a second line.
        </CardContent>
      </Card>
    </li>
    <li>
      <Card variant="outlined">
        <CardContent>Support</CardContent>
      </Card>
    </li>
  </ul>
</template>
