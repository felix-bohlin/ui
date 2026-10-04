<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea
    label="Message"
    required
    data-testid="message"
    placeholder="Write something"
  />
</template>
