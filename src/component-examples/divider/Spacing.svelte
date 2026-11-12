<script lang="ts">
  import { Card, CardContent, Divider } from "opui-css/svelte"
</script>

<Card variant="outlined">
  <CardContent>Order 1042, placed on 3 March.</CardContent>
  <Divider />
  <CardContent>
    Two linen shirts: €98
    <Divider />
    Shipping: free
  </CardContent>
</Card>

<div style="--ui-divider-gap: var(--ui-space-1)">
  Ships to Lena Handén, Stockholm
  <Divider />
  Arrives in 2 to 4 days
</div>
