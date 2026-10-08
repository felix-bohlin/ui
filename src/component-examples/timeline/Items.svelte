<script lang="ts">
  import { Timeline } from "opui-css/svelte"

  const releases = [
    {
      datetime: "2026-04-02",
      description: "The first stable release.",
      time: "Apr 2, 2026",
      title: "Version 1.0",
    },
    {
      datetime: "2026-06-18",
      description: "Dark mode and keyboard shortcuts.",
      time: "Jun 18, 2026",
      title: "Version 1.1",
    },
    {
      current: true,
      datetime: "2026-10-01",
      description: "A new board and saved views.",
      time: "Oct 1, 2026",
      title: "Version 2.0",
    },
  ]
</script>

<Timeline items={releases} />
