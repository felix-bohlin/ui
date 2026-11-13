<script lang="ts">
  import {
    Card,
    CardContent,
    CardHeader,
    Timeline,
    TimelineItem,
  } from "opui-css/svelte"
</script>

<Card style="max-inline-size: 20rem" variant="outlined">
  <CardHeader>
    <h3 class="ui-h5">Album plan</h3>
  </CardHeader>
  <CardContent>
    <Timeline>
      <TimelineItem
        datetime="2026-09-02"
        headingLevel={4}
        label="Songs written"
        time="Sep 2"
      />
      <TimelineItem
        datetime="2026-09-16"
        headingLevel={4}
        label="Bass tracked"
        time="Sep 16"
      />
      <TimelineItem
        current="step"
        datetime="2026-10-14"
        headingLevel={4}
        label="Mix review"
        time="Oct 14"
      >
        <p>Moved from October 10.</p>
      </TimelineItem>
      <TimelineItem
        datetime="2026-10-31"
        headingLevel={4}
        label="Release party"
        time="Oct 31"
      />
    </Timeline>
  </CardContent>
</Card>
