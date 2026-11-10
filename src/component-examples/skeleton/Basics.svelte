<script lang="ts">
  import { Skeleton } from "opui-css/svelte"
</script>

<div class="ui-layout-row" aria-busy="true" style="inline-size: 20rem">
  <Skeleton shape="circle" style="inline-size: 3rem" />
  <div style="flex: 1">
    <Skeleton line />
    <Skeleton line />
  </div>
</div>
