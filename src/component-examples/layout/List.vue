<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <ul role="list" class="ui-layout-grid" style="--_min-inline-size: 10rem">
    <li>
      <Card variant="outlined">
        <CardContent>Bass</CardContent>
      </Card>
    </li>
    <li>
      <Card variant="outlined">
        <CardContent>
          Drums: keeps the beat and somehow gets all the credit
        </CardContent>
      </Card>
    </li>
    <li>
      <Card variant="outlined">
        <CardContent>Vocals</CardContent>
      </Card>
    </li>
  </ul>
</template>
