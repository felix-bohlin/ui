<script setup lang="ts">
import { Avatar, Message, MessageList } from "opui-css/vue"
</script>

<template>
  <MessageList aria-label="Messages with Stella">
    <Message author="Stella" datetime="2026-10-08T14:32" time="14:32">
      <template #start>
        <Avatar>SN</Avatar>
      </template>
      <p>Let me ask if the band even noticed.</p>
    </Message>
    <Message typing>
      <template #start>
        <Avatar>SN</Avatar>
      </template>
      Stella is typing…
    </Message>
  </MessageList>
</template>
