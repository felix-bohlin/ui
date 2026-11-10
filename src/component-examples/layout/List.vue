<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <ul role="list" class="ui-layout-grid" style="--_min-inline-size: 10rem">
    <li>
      <Card variant="outlined">
        <CardContent>Design</CardContent>
      </Card>
    </li>
    <li>
      <Card variant="outlined">
        <CardContent>
          Engineering: builds and runs the app and the API
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
