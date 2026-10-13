<script setup lang="ts">
import { Anchor, AnchorContent, Button, Card, CardContent } from "opui-css/vue"
</script>

<template>
  <Anchor alignment="inline-end">
    <Button variant="outlined">Export</Button>
    <AnchorContent>
      <Card variant="tonal" class="coach-mark">
        <CardContent>
          <strong>New</strong> Export to PDF and CSV from the same menu.
        </CardContent>
      </Card>
    </AnchorContent>
  </Anchor>
</template>

<style>
.coach-mark {
  font-size: var(--font-size-1);
  margin-inline-start: var(--size-2);
  max-inline-size: 220px;
}
</style>
