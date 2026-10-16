<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"
</script>

<template>
  <Messages label="Messages with Saga">
    <Message author="Saga" datetime="2026-10-08T14:02" time="14:02">
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      <p>Did you get a chance to look at the pricing proposal?</p>
    </Message>
    <Message author="Saga" datetime="2026-10-08T14:03" time="14:03">
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      <p>No rush, Friday is fine.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
      <p>Yes, looks good. I'd lead with the annual plan.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T14:19" outgoing time="14:19">
      <p>Can you add the Bergen Bikes case study too?</p>
      <template #footer>· Read</template>
    </Message>
  </Messages>
</template>
