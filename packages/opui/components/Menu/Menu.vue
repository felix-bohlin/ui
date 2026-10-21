<script setup lang="ts">
import { computed, inject, provide, reactive, useId } from "vue"
import { MenuKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const {
  align,
  bordered,
  dense,
  id,
  items,
  placement,
  popover = "auto",
} = defineProps<Props>()
defineSlots<Slots>()

const uid = useId()
const menuId = computed(() => id || `menu-${uid}`)
const parent = inject(MenuKey, undefined)
const rootId = computed(() => parent?.rootId ?? menuId.value)
provide(MenuKey, reactive({ rootId }))
</script>

<template>
  <menu
    :id="menuId"
    :class="[
      'ui-menu',
      'ui-list',
      {
        'ui-align-end': align === 'end',
        'ui-bordered': bordered,
        'ui-dense': dense,
      },
      placement && placement !== 'block-end' && `ui-${placement}`,
      $props.class,
    ]"
    :popover="popover === 'auto' ? '' : popover"
  >
    <li
      v-for="(
        {
          borderTop,
          closeOnClick = true,
          critical,
          disabled,
          href,
          shortcut,
          text,
          ...itemRest
        },
        index
      ) in items"
      :key="index"
      :class="[{ 'ui-border-top': borderTop, 'ui-critical': critical }]"
    >
      <component
        :is="href ? 'a' : 'button'"
        :aria-disabled="href && disabled ? 'true' : undefined"
        :command="
          !href && closeOnClick && !disabled ? 'hide-popover' : undefined
        "
        :commandfor="!href && closeOnClick && !disabled ? rootId : undefined"
        :disabled="!href && disabled ? true : undefined"
        :href="href && !disabled ? href : undefined"
        :type="href ? undefined : 'button'"
        v-bind="itemRest"
      >
        <div class="ui-text">
          <p>{{ text }}</p>
        </div>
        <div v-if="shortcut" class="ui-end">
          <kbd>{{ shortcut }}</kbd>
        </div>
      </component>
    </li>
    <slot></slot>
  </menu>
</template>
