<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline>
    <TimelineItem datetime="2026-08-04" time="Aug 4, 2026" title="Bug fixes">
      <p>Faster search and fewer duplicate notifications.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-09-12" time="Sep 12, 2026" title="Saved views">
      <p>Save filters and sorting as named views and share them with a link.</p>
    </TimelineItem>
    <TimelineItem
      datetime="2026-10-01"
      time="Oct 1, 2026"
      title="Planning and a faster board"
    >
      <p>
        Estimates from past work, and a board that renders three times faster.
      </p>
    </TimelineItem>
  </Timeline>
</template>
