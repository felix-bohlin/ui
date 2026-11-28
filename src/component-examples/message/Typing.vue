<script setup lang="ts">
import { Avatar, Message, MessageList } from "opui-css/vue"
</script>

<template>
  <MessageList aria-label="Messages with Ellen">
    <Message author="Ellen" datetime="2026-10-08T14:32" time="14:32">
      <template #start>
        <Avatar>EN</Avatar>
      </template>
      <p>Let me ask if the band even noticed.</p>
    </Message>
    <Message typing>
      <template #start>
        <Avatar>EN</Avatar>
      </template>
      Ellen is typing…
    </Message>
  </MessageList>
</template>
