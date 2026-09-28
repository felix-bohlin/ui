<script setup lang="ts">
import { useId } from "vue"
import type { Props, Slots } from "./types.d.vue"

const { align, dense, id, items, placement } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const menuId = id || useId()
</script>

<template>
  <menu
    :id="menuId"
    :class="[
      'ui-menu',
      'ui-list',
      { 'ui-align-end': align === 'end', 'ui-dense': dense },
      placement && placement !== 'block-end' && `ui-${placement}`,
      $props.class,
    ]"
    popover=""
    v-bind="$attrs"
  >
    <li
      v-for="(
        {
          borderTop,
          closeOnClick = true,
          critical,
          disabled,
          href,
          label,
          shortcut,
          ...itemRest
        },
        index
      ) in items"
      :key="index"
      :class="{ 'ui-border-top': borderTop, 'ui-critical': critical }"
    >
      <component
        :is="href ? 'a' : 'button'"
        :aria-disabled="href && disabled ? 'true' : undefined"
        :command="
          !href && closeOnClick && !disabled ? 'hide-popover' : undefined
        "
        :commandfor="!href && closeOnClick && !disabled ? menuId : undefined"
        :disabled="!href && disabled ? true : undefined"
        :href="href && !disabled ? href : undefined"
        :type="href ? undefined : 'button'"
        v-bind="itemRest"
      >
        {{ label }}
        <span v-if="shortcut" class="ui-end">
          <kbd>{{ shortcut }}</kbd>
        </span>
      </component>
    </li>
    <slot></slot>
  </menu>
</template>
