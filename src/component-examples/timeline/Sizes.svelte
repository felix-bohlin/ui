<script lang="ts">
  import { Timeline, TimelineItem } from "opui-css/svelte"
</script>

<Timeline size="small">
  <TimelineItem datetime="2026-10-08T09:12" time="09:12">
    <p>Build started.</p>
  </TimelineItem>
  <TimelineItem datetime="2026-10-08T09:15" time="09:15">
    <p>Tests passed.</p>
  </TimelineItem>
  <TimelineItem color="success" datetime="2026-10-08T09:16" time="09:16">
    <p>Deployed to production.</p>
  </TimelineItem>
</Timeline>
