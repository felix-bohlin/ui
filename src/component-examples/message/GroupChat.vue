<script setup lang="ts">
import { Avatar, Message, MessageList } from "opui-css/vue"
</script>

<template>
  <MessageList aria-label="Messages in Bassists Anonymous">
    <li class="ui-divider">Today</li>
    <Message author="Kinga" datetime="2026-10-08T09:12" time="09:12">
      <template #start>
        <Avatar>KH</Avatar>
      </template>
      <p>My new pedalboard is ready.</p>
    </Message>
    <Message author="Kinga" datetime="2026-10-08T09:13" time="09:13">
      <template #start>
        <Avatar>KH</Avatar>
      </template>
      <p>Can we jam with it today?</p>
    </Message>
    <Message author="Scott" datetime="2026-10-08T09:15" newAuthor time="09:15">
      <template #start>
        <Avatar>SH</Avatar>
      </template>
      <p>I'm free after lunch :)</p>
    </Message>
    <Message author="Scott" datetime="2026-10-08T09:16" time="09:16">
      <template #start>
        <Avatar>SH</Avatar>
      </template>
      <p>I'll book the rehearsal room.</p>
    </Message>
    <li class="ui-divider">Scott added you</li>
    <Message author="You" datetime="2026-10-08T09:20" outgoing time="09:20">
      <p>See you at one, bring snacks.</p>
    </Message>
  </MessageList>
</template>
