<script setup lang="ts">
import "../../elements/close-on-navigate.js"
import "../../elements/menu.js"
import { computed, inject, provide, reactive } from "vue"
import { MenuKey } from "./context.vue"
import { warnMissingId } from "../dev"
import { tagAttrs } from "../tag"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { Props, Slots } from "./types.vue-props"

const {
  align,
  bordered,
  dense,
  id,
  items,
  orientation,
  popover = "auto",
  side,
} = defineProps<Props>()
defineSlots<Slots>()

const parent = inject(MenuKey, undefined)

const rootId = computed(() => parent?.rootId ?? id)

const rows = computed(() =>
  items?.map((item) => {
    const {
      borderTop,
      color,
      disabled,
      href,
      keepOpen,
      label,
      shortcut,
      ...itemRest
    } = item
    const Tag = href ? "a" : "button"
    const closes =
      !href &&
      !keepOpen &&
      !disabled &&
      itemRest.type !== "submit" &&
      itemRest.type !== "reset"
    return { closes, item, Tag }
  }),
)

warnMissingId("Menu", id)

provide(MenuKey, reactive({ rootId }))
</script>

<template>
  <menu
    :class="[
      'ui-menu',
      {
        'ui-align-end': align === 'end',
        'ui-bordered': bordered,
        'ui-dense': dense,
      },
      orientation && orientation !== 'vertical' && `ui-${orientation}`,
      side && side !== 'block-end' && `ui-${side}`,
      $props.class,
    ]"
    :id="id"
    :popover="popover === 'auto' ? '' : popover"
  >
    <li
      v-for="(
        {
          closes,
          item: {
            borderTop,
            color,
            disabled,
            href,
            keepOpen,
            label,
            shortcut,
            ...itemRest
          },
          Tag,
        },
        index
      ) in rows"
      :key="index"
      v-bind="
        classAttrs([{ 'ui-border-top': borderTop }, color && `ui-${color}`])
      "
    >
      <component
        :is="Tag"
        v-bind="{
          ...tagAttrs(Tag, disabled, href),
          command: closes ? 'hide-popover' : undefined,
          commandfor: closes ? rootId : undefined,
          'data-keep-open': keepOpen ? '' : undefined,
          ...defined(itemRest),
        }"
      >
        <div class="ui-text">
          <p>{{ label }}</p>
        </div>
        <div v-if="shortcut" class="ui-end">
          <kbd>{{ shortcut }}</kbd>
        </div>
        <span
          v-if="$slots['icon-checked']"
          aria-hidden="true"
          class="ui-icon-checked"
          ><slot name="icon-checked"></slot
        ></span>
      </component>
    </li>
    <slot></slot>
  </menu>
</template>
