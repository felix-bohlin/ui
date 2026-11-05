<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea
    endText="Visible to everyone on the team."
    label="Description"
    placeholder="What is this project about?"
  />
  <Textarea
    endText="Only you can see these."
    label="Private notes"
    placeholder="Add a note..."
    variant="filled"
  />
</template>
