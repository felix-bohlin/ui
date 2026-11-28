<script lang="ts">
  import { Button, Menu } from "opui-css/svelte"
</script>

<Button command="toggle-popover" commandfor="menu-long-1" variant="outlined">
  Time zone
</Button>
<Menu
  id="menu-long-1"
  items={[
    { label: "Anchorage" },
    { label: "Auckland" },
    { label: "Bangkok" },
    { label: "Berlin" },
    { label: "Bogota" },
    { label: "Cairo" },
    { label: "Chicago" },
    { label: "Dubai" },
    { label: "Honolulu" },
    { label: "Istanbul" },
    { label: "Johannesburg" },
    { label: "Lagos" },
    { label: "Lima" },
    { label: "London" },
    { label: "Los Angeles" },
    { label: "Mumbai" },
    { label: "New York" },
    { label: "Reykjavik" },
    { label: "Seoul" },
    { label: "Stockholm" },
    { label: "Sydney" },
    { label: "Tokyo" },
  ]}
  style="--_max-block-size: 16rem"
/>
