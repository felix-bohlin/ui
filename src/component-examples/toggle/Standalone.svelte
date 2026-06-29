<script lang="ts">
  import { ToggleButton } from "@opui/svelte"
</script>

<ToggleButton name="standalone-demo-1">Toggle me</ToggleButton>
<ToggleButton name="standalone-demo-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"></path><path d="M12 8v4"
    ></path><path d="M12 16h.01"></path></svg
  >
  Toggle with icon
</ToggleButton>
