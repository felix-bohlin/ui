<script setup lang="ts">
import { Accordion, Button } from "opui-css/vue"
</script>

<template>
<Accordion open class="anatomy">
  <template #summary>Accordion title</template>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
    sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti.
    Cras ut ante in libero tempus sodales sed quis dolor.
  </p>
  <template #actions>
    <Button>Cancel</Button>
    <Button>Agree</Button>
  </template>
</Accordion>
</template>
