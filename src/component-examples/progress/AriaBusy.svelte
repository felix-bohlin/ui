<script lang="ts">
  import { Progress } from "opui-css/svelte"
</script>

<div aria-busy="true" aria-describedby="progress-aria-busy-1">
  Content here is loading.
</div>
<Progress aria-label="Content loading…" id="progress-aria-busy-1" />
