<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"
</script>

<template>
  <Messages aria-label="Messages with Sirkka">
    <Message author="Sirkka" datetime="2026-10-08T14:32" time="14:32">
      <template #start>
        <Avatar aria-label="Sirkka Nitti" role="img">SN</Avatar>
      </template>
      <p>Let me check with the team.</p>
    </Message>
    <Message typing>
      <template #start>
        <Avatar aria-label="Sirkka Nitti" role="img">SN</Avatar>
      </template>
      Sirkka is typing…
    </Message>
  </Messages>
</template>
