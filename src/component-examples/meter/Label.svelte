<script lang="ts">
  import { Meter } from "opui-css/svelte"
</script>

<div class="ui-layout-column ui-gap-x-small">
  <span class="ui-layout-row ui-spread ui-tabular-nums" id="meter-label-1"
    ><span>Gig recordings</span><span>14.2 of 20 GB</span></span
  >
  <Meter aria-labelledby="meter-label-1" max="20" value="14.2" />
</div>
