<script lang="ts">
  import { Timeline, TimelineItem } from "opui-css/svelte"
</script>

<Timeline>
  <TimelineItem
    color="critical"
    datetime="2026-10-08T12:18"
    time="12:18"
    title="Investigating"
  >
    <p>Search is slower in eu-north.</p>
  </TimelineItem>
  <TimelineItem
    color="warning"
    datetime="2026-10-08T13:40"
    time="13:40"
    title="Identified"
  >
    <p>An index rebuild competes with live traffic.</p>
  </TimelineItem>
  <TimelineItem
    color="info"
    datetime="2026-10-08T14:05"
    time="14:05"
    title="Monitoring"
  >
    <p>Response times are back to normal.</p>
  </TimelineItem>
  <TimelineItem
    color="success"
    datetime="2026-10-08T15:30"
    time="15:30"
    title="Resolved"
  >
    <p>The rebuild finished. No data was lost.</p>
  </TimelineItem>
  <TimelineItem
    color="neutral"
    datetime="2026-10-09T09:00"
    time="Oct 9"
    title="Postmortem"
  >
    <p>A full report follows within a week.</p>
  </TimelineItem>
</Timeline>
