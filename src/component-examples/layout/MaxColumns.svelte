<script lang="ts">
  import { Card, CardContent } from "opui-css/svelte"
</script>

<div
  class="ui-layout-grid"
  style="--_max-columns: 2; --_min-inline-size: 10rem"
>
  <Card variant="outlined">
    <CardContent>Backups</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Encryption</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Single sign-on</CardContent>
  </Card>
</div>
