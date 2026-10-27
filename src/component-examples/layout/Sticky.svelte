<script lang="ts">
  import { Card, CardContent } from "opui-css/svelte"
</script>

<div class="ui-layout-container">
  <div
    class="ui-layout-columns ui-breakpoint-small"
    style="--_columns: 15rem 1fr"
  >
    <Card class="ui-sticky" variant="tonal">
      <CardContent>Sections</CardContent>
    </Card>
    <div class="ui-layout-column">
      <Card variant="outlined">
        <CardContent>One</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Two</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Three</CardContent>
      </Card>
    </div>
  </div>
</div>
