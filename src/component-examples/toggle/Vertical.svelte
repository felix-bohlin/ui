<script lang="ts">
  import { ToggleGroup, ToggleButton } from "@opui/svelte"
</script>

<ToggleGroup
  selection="single"
  name="alignment-vertical"
  orientation="vertical"
>
  <ToggleButton value="left" aria-label="Align left">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12v-2H3v2zm0-6v2h18V3H3z"
      ></path></svg
    >
  </ToggleButton>
  <ToggleButton value="center" checked aria-label="Align center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm4-4h10v-2H7v2zm-4-4h18v-2H3v2zm4-4h10v-2H7v2zM3 3v2h18V3H3z"
      ></path></svg
    >
  </ToggleButton>
  <ToggleButton value="right" aria-label="Align right">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12v-2H9v2zM3 3v2h18V3H3z"
      ></path></svg
    >
  </ToggleButton>
</ToggleGroup>
