<script setup lang="ts">
import { Badge } from "opui-css/vue"
</script>

<template>
  <Badge hideLabel invisible label="5 unread messages">
    <!-- -->
    <template #indicator>5</template>
  </Badge>
</template>
