<script setup lang="ts">
import { Anchor, Button, Card } from "opui-css/vue"
</script>

<template>
  <Anchor alignment="inline-end">
    <Button variant="outlined">Export</Button>
    <template #anchored>
      <Card variant="tonal" class="coach-mark">
        <template #content>
          <strong>New</strong> Export to PDF and CSV from the same menu.
        </template>
      </Card>
    </template>
  </Anchor>
</template>

<style>
.coach-mark {
  font-size: var(--font-size-1);
  margin-inline-start: var(--size-2);
  max-inline-size: 220px;
}
</style>
