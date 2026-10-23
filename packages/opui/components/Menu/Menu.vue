<script setup lang="ts">
import { computed, inject, provide, reactive } from "vue"
import { MenuKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const {
  align,
  bordered,
  dense,
  id,
  items,
  popover = "auto",
  side,
} = defineProps<Props>()
defineSlots<Slots>()

const parent = inject(MenuKey, undefined)
const rootId = computed(() => parent?.rootId ?? id)
provide(MenuKey, reactive({ rootId }))
</script>

<template>
  <menu
    :id="id"
    :class="[
      'ui-menu',
      'ui-list',
      {
        'ui-align-end': align === 'end',
        'ui-bordered': bordered,
        'ui-dense': dense,
      },
      side && side !== 'block-end' && `ui-${side}`,
      $props.class,
    ]"
    :popover="popover === 'auto' ? '' : popover"
  >
    <li
      v-for="(
        {
          borderTop,
          color,
          disabled,
          href,
          keepOpen,
          label,
          shortcut,
          ...itemRest
        },
        index
      ) in items"
      :key="index"
      :class="[{ 'ui-border-top': borderTop }, color && `ui-${color}`]"
    >
      <component
        :is="href ? 'a' : 'button'"
        :aria-disabled="href && disabled ? 'true' : undefined"
        :command="!href && !keepOpen && !disabled ? 'hide-popover' : undefined"
        :commandfor="!href && !keepOpen && !disabled ? rootId : undefined"
        :disabled="!href && disabled ? true : undefined"
        :href="href && !disabled ? href : undefined"
        :type="href ? undefined : 'button'"
        v-bind="itemRest"
      >
        <div class="ui-text">
          <p>{{ label }}</p>
        </div>
        <div v-if="shortcut" class="ui-end">
          <kbd>{{ shortcut }}</kbd>
        </div>
      </component>
    </li>
    <slot></slot>
  </menu>
</template>
