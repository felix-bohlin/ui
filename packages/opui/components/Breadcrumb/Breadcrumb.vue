<script setup lang="ts">
import { computed, useId } from "vue"
import Button from "../Button/Button.vue"
import Menu from "../Menu/Menu.vue"
import { collapsedLevels } from "./collapsed"
import type { Props, Slots } from "./types.vue-props"

const { items, menuLabel, overflow, size } = defineProps<Props>()
defineSlots<Slots>()

const uid = useId()

const lastIndex = computed(() => (items ? items.length - 1 : -1))

const collapsed = computed(() =>
  overflow === "menu" && items ? collapsedLevels(items) : [],
)

const collapsing = computed(() => collapsed.value.length > 0)

const menuId = computed(() => `breadcrumb-menu-${uid}`)

const head = computed(() => (collapsing.value ? items?.slice(0, 1) : items))

const tail = computed(() => (collapsing.value ? items?.slice(1) : undefined))
</script>

<template>
  <nav
    :class="[
      'ui-breadcrumb',
      overflow && overflow !== 'wrap' && `ui-overflow-${overflow}`,
      size && size !== 'medium' && `ui-${size}`,
    ]"
  >
    <ol>
      <li v-for="({ current, href, label }, index) in head" :key="index">
        <span
          v-if="index > 0 && $slots.separator"
          aria-hidden="true"
          class="ui-separator"
        >
          <slot name="separator"></slot> </span
        ><component
          :is="href ? 'a' : 'span'"
          :aria-current="(current ?? index === lastIndex) ? 'page' : undefined"
          :href="href"
          >{{ label }}</component
        >
      </li>
      <li v-if="collapsing">
        <span v-if="$slots.separator" aria-hidden="true" class="ui-separator">
          <slot name="separator"></slot> </span
        ><Button
          :aria-label="menuLabel"
          command="toggle-popover"
          :commandfor="menuId"
          round
          size="x-small"
          >…</Button
        ><Menu :id="menuId" :items="collapsed" />
      </li>
      <li v-for="({ current, href, label }, index) in tail" :key="index">
        <span v-if="$slots.separator" aria-hidden="true" class="ui-separator">
          <slot name="separator"></slot> </span
        ><component
          :is="href ? 'a' : 'span'"
          :aria-current="
            (current ?? index === lastIndex - 1) ? 'page' : undefined
          "
          :href="href"
          >{{ label }}</component
        >
      </li>
      <slot></slot>
    </ol>
  </nav>
</template>
