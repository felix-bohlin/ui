<script setup lang="ts">
import { useId } from "vue"
import type { Props, Slots } from "./types.d.vue"

const {
  align,
  dense,
  id,
  items,
  placement,
  popover = "auto",
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const uid = useId()
const menuId = id || uid
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
    :popover="popover === 'auto' ? '' : popover"
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
