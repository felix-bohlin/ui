<script setup lang="ts">
import { Anchor, AnchorContent, Button, Card, CardContent } from "opui-css/vue"
</script>

<template>
  <Anchor positionArea="inline-end">
    <Button variant="outlined">Export</Button>
    <AnchorContent>
      <Card class="coach-mark" variant="tonal">
        <CardContent>
          <strong>New</strong> Export to PDF and CSV from the same menu.
        </CardContent>
      </Card>
    </AnchorContent>
  </Anchor>
</template>

<style>
.coach-mark {
  font-size: var(--ui-font-size-body);
  margin-inline-start: var(--ui-space-2);
  max-inline-size: 220px;
}
</style>
