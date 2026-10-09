<script setup lang="ts">
import { computed, useId } from "vue"
import Button from "../Button/Button.vue"
import type { Props, Slots } from "./types.d.vue"

const {
  author,
  datetime,
  newAuthor,
  outgoing,
  picker,
  pickerLabel = "Add reaction",
  reactions,
  reactionsLabel = "Reactions",
  time,
  typing,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

const pickerId = useId()
const hasPicker = computed(() => !!picker?.length)
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
    <slot name="avatar"></slot>
    <div v-if="typing" class="ui-bubble" role="status">
      <span class="ui-sr-only"><slot></slot></span>
    </div>
    <div v-else class="ui-bubble">
      <p v-if="author" class="ui-header">{{ author }}</p>
      <slot></slot>
      <p v-if="time || slots.footer" class="ui-footer">
        <time v-if="time" :datetime="datetime">{{ time }}</time>
        <slot name="footer"></slot>
      </p>
    </div>
    <div
      v-if="reactions?.length"
      :aria-label="reactionsLabel"
      class="ui-reactions"
      role="group"
    >
      <label
        v-for="{ count, emoji, label, mine, value } in reactions"
        :key="value ?? emoji"
        class="ui-reaction"
        :data-count="count"
      >
        <input
          :checked.attr="mine || undefined"
          class="ui-sr-only"
          :form="hasPicker ? pickerId : undefined"
          name="reaction"
          type="checkbox"
          :value="value ?? emoji"
        />
        <span aria-hidden="true">{{ emoji }}</span>
        <span class="ui-sr-only">{{ label }}</span>
      </label>
    </div>
    <template v-if="hasPicker">
      <Button
        class="ui-reaction-add"
        command="toggle-popover"
        :commandfor="pickerId"
        :label="pickerLabel"
        rounded
        size="x-small"
      >
        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8zm-3.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 14a5.5 5.5 0 0 0 10 0zM19 1v3h-3v2h3v3h2V6h3V4h-3V1z"
          />
        </svg>
      </Button>
      <form :id="pickerId" class="ui-reaction-picker" popover="">
        <button
          v-for="{ emoji, label, value } in picker"
          :key="value ?? emoji"
          :aria-label="label"
          name="add"
          type="submit"
          :value="value ?? emoji"
        >
          {{ emoji }}
        </button>
      </form>
    </template>
  </li>
</template>
