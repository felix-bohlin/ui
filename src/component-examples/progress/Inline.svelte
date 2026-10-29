<script lang="ts">
  import { Progress } from "opui-css/svelte"
</script>

<div>
  Uploading 3 of 8 files
  <Progress
    aria-label="Uploading"
    max="8"
    style="inline-size: 12rem"
    value="3"
  />
</div>
