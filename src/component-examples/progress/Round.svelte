<script lang="ts">
  import { Progress } from "opui-css/svelte"
</script>

<Progress aria-label="Uploading photos" max="8" round value="3" />
<Progress aria-label="Syncing" round />
<div class="ui-layout-media ui-small">
  <Progress aria-labelledby="progress-round-1" max="100" round value="72" />
  <span id="progress-round-1">Storage, 72% used</span>
</div>
