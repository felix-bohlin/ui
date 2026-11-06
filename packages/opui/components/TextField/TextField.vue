<script setup lang="ts">
import "../../elements/character-count.js"
import "../../elements/text-field.js"
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  useId,
  useTemplateRef,
} from "vue"
import { useInputAttrs, vSeed } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import Button from "../Button/Button.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { createIds, idRefs } from "../id"
import { hidePath, showPath } from "./icons"
import type { Props, Slots } from "./types.vue-props"

const {
  autoFit,
  characterCount,
  characterCountLabel,
  dropZone,
  endText,
  error,
  hideLabel,
  id,
  inputmode,
  label,
  name,
  passwordToggle,
  passwordToggleLabel = "Show password",
  pattern,
  size,
  spread,
  startText,
  type = "text",
  value,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

const modelValue = defineModel<string | number>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const modelElement = useTemplateRef<HTMLInputElement>("modelElement")

const initialValue = model.value

let modelForm: HTMLFormElement | null = null

const resetModel = (event: Event) =>
  setTimeout(() => {
    const element = modelElement.value
    if (event.defaultPrevented || !element) return
    model.value = element.value
  })

onMounted(() => {
  const element = modelElement.value
  if (!element) return
  if (!element.hasAttribute("value") && initialValue != null) {
    element.defaultValue = String(initialValue)
  }
  modelForm = element.form
  modelForm?.addEventListener("reset", resetModel)
})

onBeforeUnmount(() => modelForm?.removeEventListener("reset", resetModel))

const field = inject(FieldGroupKey, undefined)

const uid = useId()

const ids = computed(() => createIds(uid, "text-field", id))

const Root = computed(() =>
  passwordToggle ? "opui-text-field" : label || slots.label ? "label" : "div",
)

const Label = computed(() => (passwordToggle ? "label" : "span"))

const hasStartText = computed(() => Boolean(startText || slots["start-text"]))

const hasEndText = computed(() =>
  Boolean(endText || slots["end-text"] || characterCount),
)

const inputId = computed(() => (passwordToggle ? ids.value() : id))

const startTextId = computed(() =>
  passwordToggle && hasStartText.value ? ids.value("start-text") : undefined,
)

const endTextId = computed(() =>
  passwordToggle && hasEndText.value ? ids.value("end-text") : undefined,
)
</script>

<template>
  <component
    :is="Root"
    :class="[
      'ui-text-field',
      {
        'ui-auto-fit': autoFit,
        'ui-drop-zone': dropZone,
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <component
      :is="Label"
      v-if="label || $slots.label"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :for="passwordToggle ? inputId : undefined"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()" /></component
    >{{ " "
    }}<span v-if="hasStartText" class="ui-start-text" :id="startTextId"
      >{{ startText }}<slot name="start-text"></slot></span
    >{{ " "
    }}<span class="ui-field">
      <input
        v-bind="attrs"
        :aria-describedby="
          idRefs(startTextId, endTextId, attrs['aria-describedby'])
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="inputId"
        :inputmode="inputmode ?? (type === 'numeric' ? 'numeric' : undefined)"
        :name="name ?? field?.name"
        :pattern="pattern ?? (type === 'numeric' ? '[0-9]*' : undefined)"
        :type="type === 'numeric' ? 'text' : type"
        v-seed
        v-model="model"
        ref="modelElement"
      />{{ " "
      }}<span v-if="$slots.start" class="ui-start"
        ><slot name="start"></slot></span
      >{{ " "
      }}<span v-if="$slots.end || passwordToggle" class="ui-end"
        ><slot name="end"></slot
        ><Button
          v-if="passwordToggle"
          :aria-label="passwordToggleLabel"
          aria-pressed="false"
          command="--toggle-password"
          :commandfor="inputId"
          round
          ><span
            v-if="$slots['icon-unchecked']"
            aria-hidden="true"
            class="ui-icon-unchecked"
            ><slot name="icon-unchecked"></slot></span
          ><svg
            v-else
            aria-hidden="true"
            class="ui-icon-unchecked"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" :d="showPath" /></svg
          ><span
            v-if="$slots['icon-checked']"
            aria-hidden="true"
            class="ui-icon-checked"
            ><slot name="icon-checked"></slot></span
          ><svg
            v-else
            aria-hidden="true"
            class="ui-icon-checked"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" :d="hidePath" /></svg></Button></span
      >{{ " "
      }}<span v-if="$slots.top" class="ui-top"><slot name="top"></slot></span
      >{{ " "
      }}<span v-if="$slots.bottom" class="ui-bottom"
        ><slot name="bottom"></slot
      ></span> </span
    >{{ " "
    }}<span v-if="hasEndText" class="ui-end-text" :id="endTextId"
      >{{ endText }}<slot name="end-text"></slot
      ><component
        is="opui-character-count"
        v-if="characterCount"
        aria-hidden="true"
        class="ui-value"
        :label="characterCountLabel"
      ></component></span
    >{{ " " }}<slot></slot>
  </component>
</template>
