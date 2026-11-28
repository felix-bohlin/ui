<script lang="ts">
  import { Progress } from "opui-css/svelte"
</script>

<div aria-busy="true" aria-describedby="progress-aria-busy-1">
  Your gig photos from the last 12 months appear here.
</div>
<Progress aria-label="Loading gig photos" id="progress-aria-busy-1" />
