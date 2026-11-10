<script lang="ts">
  import { Skeleton } from "opui-css/svelte"
</script>

<div class="ui-layout-row">
  <Skeleton shape="circle" style="inline-size: 4rem" />
  <Skeleton style="block-size: 4rem; inline-size: 6rem" />
  <Skeleton shape="squared" style="block-size: 4rem; inline-size: 6rem" />
</div>
