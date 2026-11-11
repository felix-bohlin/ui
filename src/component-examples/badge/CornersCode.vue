<script setup lang="ts">
import { Badge } from "opui-css/vue"
</script>

<template>
  <Badge corner="start-start" hideLabel label="35 unread messages">
    <svg aria-hidden="true"><!-- --></svg>
    <template #indicator>35</template>
  </Badge>
  <Badge hideLabel label="More than 99 unread messages">
    <svg aria-hidden="true"><!-- --></svg>
    <template #indicator>99+</template>
  </Badge>
  <Badge corner="end-start" hideLabel label="New messages">
    <svg aria-hidden="true"><!-- --></svg>
    <template #indicator>New</template>
  </Badge>
  <Badge corner="end-end" hideLabel label="About 3,000 unread messages">
    <svg aria-hidden="true"><!-- --></svg>
    <template #indicator>3K</template>
  </Badge>
</template>
