<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme"
import { computed } from "vue"
import { useSidebarControl } from "../composables/sidebar"
import VPLink from "./VPLink.vue"

const props = defineProps<{
  item: DefaultTheme.SidebarItem & { tag?: string }
  depth: number
}>()

const {
  collapsed,
  collapsible,
  isLink,
  isActiveLink,
  hasActiveLink,
  hasChildren,
  toggle,
} = useSidebarControl(computed(() => props.item))

const sectionTag = computed(() => (hasChildren.value ? "section" : `div`))

const linkTag = computed(() => (isLink.value ? "a" : "div"))

const textTag = computed(() => {
  return !hasChildren.value
    ? "p"
    : props.depth + 2 === 7
      ? "p"
      : `h${props.depth + 2}`
})

const itemRole = computed(() => (isLink.value ? undefined : "button"))

const classes = computed(() => [
  [`level-${props.depth}`],
  { collapsible: collapsible.value },
  { collapsed: collapsed.value },
  { "is-link": isLink.value },
  { "is-active": isActiveLink.value },
  { "has-active": hasActiveLink.value },
])

function onItemInteraction(e: MouseEvent | Event) {
  if ("key" in e && e.key !== "Enter") {
    return
  }
  !props.item.link && toggle()
}

function onCaretClick() {
  props.item.link && toggle()
}
</script>

<template>
  <component :is="sectionTag" class="VPSidebarItem" :class="classes">
    <div
      v-if="item.text"
      class="item"
      :role="itemRole"
      v-on="
        item.items
          ? { click: onItemInteraction, keydown: onItemInteraction }
          : {}
      "
      :tabindex="item.items && 0"
    >
      <div class="indicator" />

      <VPLink
        v-if="item.link"
        :tag="linkTag"
        class="link"
        :href="item.link"
        :rel="item.rel"
        :target="item.target"
      >
        <component :is="textTag" class="text" v-html="item.text" />
      </VPLink>
      <component v-else :is="textTag" class="text" v-html="item.text" />

      <div
        v-if="item.collapsed != null && item.items && item.items.length"
        class="caret"
        role="button"
        aria-label="toggle section"
        @click="onCaretClick"
        @keydown.enter="onCaretClick"
        tabindex="0"
      >
        <span class="vpi-chevron-right caret-icon" />
      </div>
    </div>

    <div v-if="item.items && item.items.length" class="items">
      <template v-if="depth < 5">
        <VPSidebarItem
          v-for="i in item.items"
          :key="i.text"
          :item="i"
          :depth="depth + 1"
        />
      </template>
    </div>
  </component>
</template>

<style scoped>
.VPSidebarItem.level-0 {
  padding-block-end: 24px;
}

.VPSidebarItem.collapsed.level-0 {
  padding-block-end: 10px;
}

.item {
  position: relative;
  display: flex;
  width: 100%;

  &:hover {
    .indicator {
      background-color: var(--primary);
    }
  }
}

.VPSidebarItem.collapsible > .item {
  cursor: pointer;

  .indicator {
    visibility: hidden;
  }
}

.indicator {
  position: absolute;
  inset-block-start: 6px;
  inset-block-end: 6px;
  inset-inline-start: -2px;
  width: 2px;
  border-radius: 2px;
  transition: background-color 0.25s;
}

:is(
    .VPSidebarItem.level-2:not(.collapsible),
    .VPSidebarItem.level-3:not(.collapsible),
    .VPSidebarItem.level-4:not(.collapsible),
    .VPSidebarItem.level-5:not(.collapsible)
  )
  > .item {
  border-radius: var(--radius-1);
  padding-inline-start: 16px;
  &:hover {
    background-color: var(
      --surface-default,
      light-dark(oklch(99% 0.01 255 / 1), oklch(25% 0.01 255 / 1))
    );
  }
}

:is(.VPSidebarItem.level-1:not(.collapsible)) > .item {
  &:hover {
    .indicator {
      display: none;
    }
  }
}

.VPSidebarItem.level-2.is-active > .item > .indicator,
.VPSidebarItem.level-3.is-active > .item > .indicator,
.VPSidebarItem.level-4.is-active > .item > .indicator,
.VPSidebarItem.level-5.is-active > .item > .indicator {
  background-color: var(--primary);
}

.link {
  display: flex;
  align-items: center;
  flex-grow: 1;
  text-decoration: none;
}

.text {
  flex-grow: 1;
  padding: 4px 0;
  line-height: 24px;
  margin-block: 0;
  font-size: 14px;
  transition: color 0.25s;
}

.VPSidebarItem.level-0 {
  & > .item {
    .text {
      font-weight: 700;
      color: var(--text-color-2);
    }

    .indicator {
      visibility: hidden;
    }
  }
}

.VPSidebarItem.level-1 .text,
.VPSidebarItem.level-2 .text,
.VPSidebarItem.level-3 .text,
.VPSidebarItem.level-4 .text,
.VPSidebarItem.level-5 .text {
  font-weight: 500;
  color: var(--text-color-2-78);
}

.VPSidebarItem.level-0.is-link > .item > .link:hover .text,
.VPSidebarItem.level-1.is-link > .item > .link:hover .text,
.VPSidebarItem.level-2.is-link > .item > .link:hover .text,
.VPSidebarItem.level-3.is-link > .item > .link:hover .text,
.VPSidebarItem.level-4.is-link > .item > .link:hover .text,
.VPSidebarItem.level-5.is-link > .item > .link:hover .text {
  color: var(--primary);
}

.VPSidebarItem.level-0.has-active > .item > .text,
.VPSidebarItem.level-1.has-active > .item > .text,
.VPSidebarItem.level-2.has-active > .item > .text,
.VPSidebarItem.level-3.has-active > .item > .text,
.VPSidebarItem.level-4.has-active > .item > .text,
.VPSidebarItem.level-5.has-active > .item > .text,
.VPSidebarItem.level-0.has-active > .item > .link > .text,
.VPSidebarItem.level-1.has-active > .item > .link > .text,
.VPSidebarItem.level-2.has-active > .item > .link > .text,
.VPSidebarItem.level-3.has-active > .item > .link > .text,
.VPSidebarItem.level-4.has-active > .item > .link > .text,
.VPSidebarItem.level-5.has-active > .item > .link > .text {
  color: var(--text-color-2);
}

.VPSidebarItem.level-0.is-active > .item .link > .text,
.VPSidebarItem.level-1.is-active > .item .link > .text,
.VPSidebarItem.level-2.is-active > .item .link > .text,
.VPSidebarItem.level-3.is-active > .item .link > .text,
.VPSidebarItem.level-4.is-active > .item .link > .text,
.VPSidebarItem.level-5.is-active > .item .link > .text {
  color: var(--primary);
}

.caret {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline-end: -7px;
  width: 32px;
  height: 32px;
  color: var(--text-color-2-56);
  cursor: pointer;
  transition: color 0.25s;
  flex-shrink: 0;
}

.item:hover .caret {
  color: var(--text-color-2-78);
}

.item:hover .caret:hover {
  color: var(--text-color-2);
}

.caret-icon {
  font-size: 18px;
  transform: rotate(90deg);
  transition: transform 0.25s;
}

.VPSidebarItem.collapsed .caret-icon {
  transform: rotate(0);
}

.VPSidebarItem.level-1 .items,
.VPSidebarItem.level-2 .items,
.VPSidebarItem.level-3 .items,
.VPSidebarItem.level-4 .items,
.VPSidebarItem.level-5 .items {
  border-left: 1px solid var(--vp-c-divider);
}

.VPSidebarItem.collapsed .items {
  display: none;
}
</style>
