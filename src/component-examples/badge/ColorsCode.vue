<script setup lang="ts">
import { Badge } from "opui-css/vue"
</script>

<template>
  <Badge color="critical" hideLabel label="5 unread messages">
    <svg aria-hidden="true"><!-- --></svg>
    <template #indicator>5</template>
  </Badge>
  <Badge color="info" hideLabel label="5 unread messages">
    <svg aria-hidden="true"><!-- --></svg>
    <template #indicator>5</template>
  </Badge>
  <Badge color="neutral" hideLabel label="5 unread messages">
    <svg aria-hidden="true"><!-- --></svg>
    <template #indicator>5</template>
  </Badge>
  <Badge color="success" hideLabel label="5 unread messages">
    <svg aria-hidden="true"><!-- --></svg>
    <template #indicator>5</template>
  </Badge>
  <Badge color="warning" hideLabel label="5 unread messages">
    <svg aria-hidden="true"><!-- --></svg>
    <template #indicator>5</template>
  </Badge>
</template>
