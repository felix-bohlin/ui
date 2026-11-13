<script setup lang="ts">
import {
  Avatar,
  Message,
  MessageList,
  ToggleButton,
  ToggleGroup,
} from "opui-css/vue"
</script>

<template>
  <MessageList aria-label="Messages with Stella">
    <Message author="Stella" datetime="2026-10-08T16:05" time="16:05">
      <template #start>
        <Avatar aria-hidden="true">SN</Avatar>
      </template>
      <p>My slap cover is up. Thanks for listening, everyone!</p>
      <template #bottom>
        <ToggleGroup aria-label="Reactions" multiple name="reaction">
          <ToggleButton aria-label="Thumbs up, 2" checked value="+1"
            ><span aria-hidden="true">👍 2</span></ToggleButton
          >
          <ToggleButton aria-label="Party, 1" value="tada"
            ><span aria-hidden="true">🎉 1</span></ToggleButton
          >
        </ToggleGroup>
      </template>
    </Message>
    <Message author="You" datetime="2026-10-08T16:07" outgoing time="16:07">
      <p>Totally rad, that low B rattled my windows.</p>
      <template #bottom>
        <ToggleGroup aria-label="Reactions" multiple name="reaction">
          <ToggleButton aria-label="Heart, 1" value="heart"
            ><span aria-hidden="true">❤️ 1</span></ToggleButton
          >
        </ToggleGroup>
      </template>
    </Message>
  </MessageList>
</template>
