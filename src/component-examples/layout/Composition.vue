<script setup lang="ts">
import { Button, Card, CardContent } from "opui-css/vue"
</script>

<template>
  <div class="ui-l-container" style="--_max-inline-size: 40rem">
    <div class="ui-l-flow ui-large">
      <div class="ui-l-flow ui-x-small">
        <h3 class="ui-h4">Team</h3>
        <p>Invite people to work on this project.</p>
      </div>
      <div class="ui-l-grid" style="--_min-inline-size: 10rem">
        <Card variant="tonal">
          <CardContent>Design</CardContent>
        </Card>
        <Card variant="tonal">
          <CardContent>Engineering</CardContent>
        </Card>
        <Card variant="tonal">
          <CardContent>Support</CardContent>
        </Card>
      </div>
      <div class="ui-l-cluster" style="--_justify-content: flex-end">
        <Button>Cancel</Button>
        <Button color="primary" variant="filled">Invite</Button>
      </div>
    </div>
  </div>
</template>
