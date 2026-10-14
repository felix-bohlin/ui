<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline>
    <TimelineItem
      color="critical"
      datetime="2026-10-08T12:18"
      time="12:18"
      heading="Investigating"
    >
      <p>Search is slower in eu-north.</p>
    </TimelineItem>
    <TimelineItem
      color="warning"
      datetime="2026-10-08T13:40"
      time="13:40"
      heading="Identified"
    >
      <p>An index rebuild competes with live traffic.</p>
    </TimelineItem>
    <TimelineItem
      color="info"
      datetime="2026-10-08T14:05"
      time="14:05"
      heading="Monitoring"
    >
      <p>Response times are back to normal.</p>
    </TimelineItem>
    <TimelineItem
      color="success"
      datetime="2026-10-08T15:30"
      time="15:30"
      heading="Resolved"
    >
      <p>The rebuild finished. No data was lost.</p>
    </TimelineItem>
    <TimelineItem
      color="neutral"
      datetime="2026-10-09T09:00"
      time="Oct 9"
      heading="Postmortem"
    >
      <p>A full report follows within a week.</p>
    </TimelineItem>
  </Timeline>
</template>
