<script lang="ts">
  import { Timeline, TimelineItem } from "opui-css/svelte"
</script>

<Timeline>
  <TimelineItem
    color="success"
    datetime="2026-10-01"
    time="Oct 1"
    title="Ordered"
  >
    {#snippet marker()}<svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg
      >{/snippet}
  </TimelineItem>
  <TimelineItem
    color="success"
    datetime="2026-10-02"
    time="Oct 2"
    title="Packed"
  >
    {#snippet marker()}<svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg
      >{/snippet}
  </TimelineItem>
  <TimelineItem
    color="success"
    datetime="2026-10-03"
    time="Oct 3"
    title="Shipped"
  >
    {#snippet marker()}<svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg
      >{/snippet}
    <p>On its way from Gothenburg.</p>
  </TimelineItem>
  <TimelineItem datetime="2026-10-06" time="Oct 6" title="Delivered" />
</Timeline>
