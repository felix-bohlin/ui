<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core"
import { onContentUpdated } from "vitepress"
import { nextTick, ref, watch } from "vue"
import { useData } from "../composables/data"
import { resolveTitle, type MenuItem } from "../composables/outline"
import VPDocOutlineItem from "./VPDocOutlineItem.vue"

const props = defineProps<{
  headers: MenuItem[]
  navHeight: number
}>()

const { theme } = useData()
const open = ref(false)
const vh = ref(0)
const main = ref<HTMLDivElement>()
const items = ref<HTMLDivElement>()

function closeOnClickOutside(e: Event) {
  if (!main.value?.contains(e.target as Node)) {
    open.value = false
  }
}

watch(open, (value) => {
  if (value) {
    document.addEventListener("click", closeOnClickOutside)
    return
  }
  document.removeEventListener("click", closeOnClickOutside)
})

onKeyStroke("Escape", () => {
  open.value = false
})

onContentUpdated(() => {
  open.value = false
})

function toggle() {
  open.value = !open.value
  vh.value = window.innerHeight + Math.min(window.scrollY - props.navHeight, 0)
}

function onItemClick(e: Event) {
  if ((e.target as HTMLElement).classList.contains("outline-link")) {
    // disable animation on hash navigation when page jumps
    if (items.value) {
      items.value.style.transition = "none"
    }
    nextTick(() => {
      open.value = false
    })
  }
}

function scrollToTop() {
  open.value = false
  window.scrollTo({ blockStart: 0, inlineStart: 0, behavior: "smooth" })
}
</script>

<template>
  <div
    class="VPLocalNavOutlineDropdown"
    :style="{ '--vp-vh': vh + 'px' }"
    ref="main"
  >
    <button
      class="button small"
      @click="toggle"
      :class="{ open }"
      v-if="headers.length > 0"
    >
      <span class="menu-text">{{ resolveTitle(theme) }}</span>
      <span class="vpi-chevron-right icon" />
    </button>
    <button class="button small" @click="scrollToTop" v-else>
      {{ theme.returnToTopLabel || "Return to top" }}
    </button>
    <Transition name="flyout">
      <div v-if="open" ref="items" class="items" @click="onItemClick">
        <div class="header">
          <a class="top-link" href="#" @click="scrollToTop">
            {{ theme.returnToTopLabel || "Return to top" }}
          </a>
        </div>
        <div class="outline">
          <VPDocOutlineItem :headers="headers" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.VPLocalNavOutlineDropdown {
  padding: var(--size-1) 20px;
}

@media (min-width: 960px) {
  .VPLocalNavOutlineDropdown {
    padding: 12px 36px 11px;
  }
}

.VPLocalNavOutlineDropdown button {
  color: var(--text-color-2-78);
  display: block;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  position: relative;
  transition: color 0.5s;
}

.VPLocalNavOutlineDropdown button:hover {
  color: var(--text-color-2);
  transition: color 0.25s;
}

.VPLocalNavOutlineDropdown button.open {
  color: var(--text-color-2);
}

.icon {
  display: inline-block;
  vertical-align: middle;
  margin-inline-start: 2px;
  font-size: 14px;
  transform: rotate(0deg);
  transition: transform 0.25s;
}

@media (min-width: 960px) {
  .icon {
    font-size: 16px;
  }
}

.open > .icon {
  transform: rotate(90deg);
}

.items {
  background-color: var(--vp-c-gutter);
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  box-shadow: var(
    --shadow-3,
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1)
  );
  display: grid;
  gap: 1px;
  inset-inline-start: 16px;
  max-height: calc(var(--vp-vh, 100vh) - 86px);
  overflow: hidden auto;
  position: absolute;
  inset-inline-end: 16px;
  top: 50px;

  @media (min-width: 960px) {
    inset-inline-start: calc(var(--vp-sidebar-width) + 32px);
    inset-inline-end: auto;
    width: 320px;
  }
}

.header {
  background-color: var(--vp-c-bg-soft);
}

.top-link {
  color: var(--primary);
  display: block;
  padding: 0 16px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: var(--primary-light);
  }
}

.outline {
  padding: 8px 0;
  background-color: var(--vp-c-bg-soft);
}

.flyout-enter-active {
  transition: all 0.2s ease-out;
}

.flyout-leave-active {
  transition: all 0.15s ease-in;
}

.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
