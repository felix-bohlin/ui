<script setup lang="ts">
import { Avatar, Message, MessageList } from "opui-css/vue"
</script>

<template>
  <div aria-label="Chat with Stella" role="log">
    <MessageList aria-label="Messages with Stella">
      <Message author="Stella" datetime="2026-10-08T14:02" time="14:02">
        <template #start>
          <Avatar aria-hidden="true">SN</Avatar>
        </template>
        <p>Heyyy! Did your band notice you changed strings yet?</p>
      </Message>
      <Message author="Stella" datetime="2026-10-08T14:03" time="14:03">
        <template #start>
          <Avatar aria-hidden="true">SN</Avatar>
        </template>
        <p>Flatwounds, right? So rad.</p>
      </Message>
      <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
        <p>Nope, not even the drummer. Bummer, but WE know.</p>
      </Message>
      <Message author="You" datetime="2026-10-08T14:19" outgoing time="14:19">
        <p>Can you send me the tab for your slap break?</p>
        <template #end>Read</template>
      </Message>
    </MessageList>
  </div>
</template>
