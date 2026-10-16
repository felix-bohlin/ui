<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"
</script>

<template>
  <Messages label="Messages in #design">
    <Message author="Leila" datetime="2026-10-08T09:12" time="09:12">
      <template #avatar>
        <Avatar aria-label="Leila Haddad" role="img">LH</Avatar>
      </template>
      <p>The new icons are ready.</p>
    </Message>
    <Message author="Leila" datetime="2026-10-08T09:13" time="09:13">
      <template #avatar>
        <Avatar aria-label="Leila Haddad" role="img">LH</Avatar>
      </template>
      <p>Can we review them today?</p>
    </Message>
    <Message author="Omar" datetime="2026-10-08T09:15" new-author time="09:15">
      <template #avatar>
        <Avatar aria-label="Omar Saleh" role="img">OS</Avatar>
      </template>
      <p>I'm free after lunch.</p>
    </Message>
    <Message author="Omar" datetime="2026-10-08T09:16" time="09:16">
      <template #avatar>
        <Avatar aria-label="Omar Saleh" role="img">OS</Avatar>
      </template>
      <p>I'll book a room.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T09:20" outgoing time="09:20">
      <p>See you at one.</p>
    </Message>
  </Messages>
</template>
