<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"
</script>

<template>
  <Messages label="Messages with Saga">
    <Message author="Saga" datetime="2026-10-08T14:32" time="14:32">
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      <p>Let me check with the team.</p>
    </Message>
    <Message typing>
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      Saga is typing…
    </Message>
  </Messages>
</template>
