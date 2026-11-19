<script setup lang="ts">
import "../../elements/file-upload.js"
import { computed, useId } from "vue"
import { vHydrated } from "../vue"
import Button from "../Button/Button.vue"
import Progress from "../Progress/Progress.vue"
import { classAttrs } from "../cx"
import type { Props, Emits } from "./types.vue-props"

const {
  accept,
  description,
  disabled,
  id,
  items,
  label,
  multiple,
  progressLabel = "Uploading {label}",
  removeLabel = "Remove {label}",
  status,
} = defineProps<Props>()
const emit = defineEmits<Emits>()

const uid = useId()

const base = computed(() => id || `file-upload-${uid}`)

const inputId = computed(() => base.value)

const descriptionId = computed(() =>
  description ? `${base.value}-description` : undefined,
)
</script>

<template>
  <component
    is="opui-file-upload"
    :class="['ui-file-upload', $props.class]"
    @remove="emit('remove', $event)"
    @select="emit('select', $event)"
    data-hydrating=""
    v-hydrated
  >
    <div class="ui-content">
      <div class="ui-field">
        <label class="ui-label">
          <input
            :accept="accept"
            :aria-describedby="descriptionId"
            class="ui-sr-only"
            :disabled="disabled"
            :id="inputId"
            :multiple="multiple"
            type="file"
          />
          <span class="ui-button ui-outlined">{{ label }}</span>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          ></svg>
        </label>
        <span v-if="description" class="ui-description" :id="descriptionId">{{
          description
        }}</span>
      </div>
      <ul v-if="items && items.length > 0" class="ui-list">
        <li
          v-for="(item, index) in items"
          :key="index"
          v-bind="classAttrs([{ 'ui-error': item.state === 'error' }])"
        >
          <div class="ui-start">
            <img v-if="item.preview" alt="" :src="item.preview" /><button
              v-if="item.state === 'error' && item.description"
              :aria-labelledby="`${inputId}-label-${index} ${inputId}-description-${index}`"
              :popovertarget="`${inputId}-description-${index}`"
              type="button"
            ></button>
          </div>
          <div class="ui-text">
            <p dir="auto" :id="`${inputId}-label-${index}`">{{ item.label }}</p>
            <Progress
              v-if="item.state === 'queued' || item.state === 'uploading'"
              :aria-label="progressLabel.replace('{label}', item.label)"
              :value="
                item.state === 'uploading' ? (item.progress ?? 0) : undefined
              "
            />
            <p
              v-if="item.description"
              class="ui-description"
              :id="`${inputId}-description-${index}`"
              :popover="item.state === 'error' ? 'auto' : undefined"
            >
              {{ item.description }}
            </p>
          </div>
          <div class="ui-end">
            <Button
              :aria-label="removeLabel.replace('{label}', item.label)"
              command="--remove"
              :commandfor="inputId"
              round
              size="small"
              :value="item.value"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              ></svg>
            </Button>
          </div>
        </li>
      </ul>
    </div>
    <span class="ui-sr-only" role="status">{{ status }}</span>
  </component>
</template>
