<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Textarea label="Message" placeholder="How can we help?" required />
    <Textarea
      label="Delivery instructions"
      placeholder="Gate code, floor, where to leave it"
      required
      variant="filled"
    />
  </div>

  <div class="example-row">
    <Textarea
      endText="Write at least 20 characters."
      error
      label="Review"
      value="Great"
    />
    <Textarea
      endText="Remove the link. Bios are plain text."
      error
      label="Bio"
      value="Designer at https://example.com"
      variant="filled"
    />
  </div>
</template>
