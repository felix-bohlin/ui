<script setup lang="ts">
import { Button, Card, CardContent } from "opui-css/vue"
</script>

<template>
  <div class="ui-layout-container" style="--_max-inline-size: 40rem">
    <div class="ui-layout-column ui-large">
      <div class="ui-layout-column ui-x-small">
        <h3 class="ui-h4">Band</h3>
        <p>Invite bandmates to jam on this setlist.</p>
      </div>
      <div class="ui-layout-grid" style="--_min-inline-size: 10rem">
        <Card variant="tonal">
          <CardContent>Drums</CardContent>
        </Card>
        <Card variant="tonal">
          <CardContent>Guitar</CardContent>
        </Card>
        <Card variant="tonal">
          <CardContent>Vocals</CardContent>
        </Card>
      </div>
      <div class="ui-layout-row ui-align-end">
        <Button>Cancel</Button>
        <Button color="primary" variant="filled">Invite</Button>
      </div>
    </div>
  </div>
</template>
