<script lang="ts">
  import { Timeline, TimelineItem } from "opui-css/svelte"
</script>

<Timeline>
  <TimelineItem
    color="critical"
    datetime="2026-10-08T12:18"
    label="Investigating"
    time="12:18"
  >
    <p>Scribbles are slow to show up in Europe.</p>
  </TimelineItem>
  <TimelineItem
    color="warning"
    datetime="2026-10-08T13:40"
    label="Identified"
    time="13:40"
  >
    <p>A huge photo upload from the gig hogs the servers.</p>
  </TimelineItem>
  <TimelineItem
    color="info"
    datetime="2026-10-08T14:05"
    label="Monitoring"
    time="14:05"
  >
    <p>Scribbles show up as fast as a slap again.</p>
  </TimelineItem>
  <TimelineItem
    color="success"
    datetime="2026-10-08T15:30"
    label="Resolved"
    time="15:30"
  >
    <p>The upload finished. No scribbles were lost, phew.</p>
  </TimelineItem>
  <TimelineItem
    color="neutral"
    datetime="2026-10-09T09:00"
    label="Postmortem"
    time="Oct 9"
  >
    <p>A full report for the Bassbook crew within a week.</p>
  </TimelineItem>
</Timeline>
