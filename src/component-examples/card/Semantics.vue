<script setup lang="ts">
import { Card, CardContent, CardHeader, Chip } from "opui-css/vue"
</script>

<template>
  <Card as="article" variant="outlined">
    <CardHeader as="header">
      <hgroup>
        <p>Gear Talk</p>
        <h3>How I cut my pedalboard in half</h3>
        <p>Lou Headstock, 12 March</p>
      </hgroup>
      <Chip label="5 min read" size="small" />
    </CardHeader>
    <CardContent>
      Ditching the third fuzz and one very sad chorus pedal took my setup time
      from twelve minutes to five. Totally rad!
    </CardContent>
  </Card>
</template>
