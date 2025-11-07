<script lang="ts" setup>
import { ref } from "vue"
import { useFlyout } from "../composables/flyout"
import VPMenu from "./VPMenu.vue"

defineProps<{
  icon?: string
  button?: string
  label?: string
  items?: any[]
}>()

const open = ref(false)
const el = ref<HTMLElement>()

useFlyout({ el, onBlur })

function onBlur() {
  open.value = false
}
</script>

<template>
  <div
    class="VPFlyout"
    ref="el"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="icon-button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="open = !open"
    >
      <span v-if="button || icon" class="text">
        <span v-if="icon" :class="[icon, 'option-icon']" />
        <span v-if="button" v-html="button"></span>
        <span class="vpi-chevron-down text-icon" />
      </span>

      <span v-else class="vpi-more-horizontal icon" />
    </button>

    <div class="menu">
      <VPMenu :items="items">
        <slot />
      </VPMenu>
    </div>
  </div>
</template>

<style scoped>
.VPFlyout {
  position: relative;
}

.VPFlyout:hover .text {
  color: var(--text-color-2-78);
}

.VPFlyout:hover .icon {
  fill: var(--text-color-2-78);
}

.VPFlyout.active .text {
  color: var(--primary);
}

.VPFlyout.active:hover .text {
  color: var(--primary-light);
}

.VPFlyout:hover .menu,
.button[aria-expanded="true"] + .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.button[aria-expanded="false"] + .menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
}

.button {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: var(--vp-nav-height);
  color: var(--text-color-2);
  transition: color 0.5s;

  &:hover,
  &:active {
    --_bg-color: inherit;
  }
}

.text {
  display: flex;
  align-items: center;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-2);
  transition: color 0.25s;
}

.option-icon {
  margin-inline-end: 0px;
  font-size: 16px;
}

.text-icon {
  margin-inline-start: 4px;
  font-size: 14px;
}

.icon {
  font-size: 20px;
  transition: fill 0.25s;
}

.menu {
  position: absolute;
  top: calc(var(--vp-nav-height) / 2 + 20px);
  inset-inline-end: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.25s,
    visibility 0.25s,
    transform 0.25s;
}
</style>
