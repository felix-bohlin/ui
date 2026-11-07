<script setup lang="ts">
import { Card, CardContent, Divider } from "opui-css/vue"
</script>

<template>
  <Card variant="outlined">
    <CardContent>Inside a card, the gap spaces the divider.</CardContent>
    <Divider />
    <CardContent>
      Nested deeper, it uses the card's tighter space.
      <Divider />
      So everything stays close together.
    </CardContent>
  </Card>

  <div style="--ui-divider-gap: var(--ui-space-1)">
    A custom space on any wrapper
    <Divider />
    reaches every divider inside it.
  </div>
</template>
