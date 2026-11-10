<script lang="ts">
  import { Card, CardContent, Skeleton } from "opui-css/svelte"
</script>

<Card aria-busy="true" style="inline-size: 16rem">
  <Skeleton style="aspect-ratio: 16 / 9" />
  <CardContent>
    <Skeleton line />
    <Skeleton line />
    <Skeleton line />
  </CardContent>
</Card>
