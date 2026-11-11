<script setup lang="ts">
import { Card, CardContent, Divider } from "opui-css/vue"
</script>

<template>
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
    Ships to Lena Ek, Stockholm
    <Divider />
    Arrives in 2 to 4 days
  </div>
</template>
