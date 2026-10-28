<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { author, datetime, newAuthor, outgoing, time, typing } =
  defineProps<Props>()
const slots = defineSlots<Slots>()
</script>

<template>
  <li
    :class="[
      'ui-message',
      {
        'ui-new-author': newAuthor,
        'ui-outgoing': outgoing,
        'ui-typing': typing,
      },
      $props.class,
    ]"
  >
    <slot name="start"></slot>
    <div v-if="typing" class="ui-content" role="status">
      <span class="ui-sr-only"><slot></slot></span>
    </div>
    <div v-else class="ui-content">
      <p v-if="author" class="ui-header">{{ author }}</p>
      <slot></slot>
      <p v-if="time || slots.end" class="ui-footer">
        <time v-if="time" :datetime="datetime">{{ time }}</time>
        <span v-if="slots.end" class="ui-end"><slot name="end"></slot></span>
      </p>
    </div>
    <div v-if="slots.bottom" class="ui-bottom">
      <slot name="bottom"></slot>
    </div>
  </li>
</template>
