<script setup lang="ts">
import { Progress } from "opui-css/vue"
</script>

<template>
  <div aria-busy="true" aria-describedby="progress-aria-busy-1">
    Your gig photos from the last 12 months appear here.
  </div>
  <Progress aria-label="Loading gig photos" id="progress-aria-busy-1" />
</template>
