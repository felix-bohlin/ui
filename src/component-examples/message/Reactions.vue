<script setup lang="ts">
import {
  Avatar,
  Message,
  Messages,
  ToggleButton,
  ToggleGroup,
} from "opui-css/vue"
</script>

<template>
  <Messages aria-label="Messages with Saga">
    <Message author="Saga" datetime="2026-10-08T16:05" time="16:05">
      <template #start>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      <p>The deck is out. Thanks everyone!</p>
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
      <p>Great work, it looks sharp.</p>
      <template #bottom>
        <ToggleGroup aria-label="Reactions" multiple name="reaction">
          <ToggleButton aria-label="Heart, 1" value="heart"
            ><span aria-hidden="true">❤️ 1</span></ToggleButton
          >
        </ToggleGroup>
      </template>
    </Message>
  </Messages>
</template>
