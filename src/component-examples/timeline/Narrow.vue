<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline style="max-inline-size: 20rem">
    <TimelineItem datetime="2026-09-02" time="Sep 2" title="Design freeze" />
    <TimelineItem
      datetime="2026-09-16"
      time="Sep 16"
      title="Feature complete"
    />
    <TimelineItem
      current="step"
      datetime="2026-10-14"
      time="Oct 14"
      title="Beta review"
    >
      <p>Moved from October 10.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-10-31" time="Oct 31" title="Launch" />
  </Timeline>
</template>
