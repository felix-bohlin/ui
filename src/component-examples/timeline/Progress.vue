<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline tracked>
    <TimelineItem datetime="2026-09-02" time="Sep 2" label="Design freeze" />
    <TimelineItem
      datetime="2026-09-16"
      time="Sep 16"
      label="Feature complete"
    />
    <TimelineItem
      current="step"
      datetime="2026-10-14"
      time="Oct 14"
      label="Beta review"
    >
      <p>Moved from October 10.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-10-31" time="Oct 31" label="Launch" />
  </Timeline>
</template>
