<script setup lang="ts">
import { computed } from "vue"
import { useData } from "../composables/data"
import { useLangs } from "../composables/langs"
import { useSidebar } from "../composables/sidebar"
import { normalizeLink } from "../support/utils"
import VPImage from "./VPImage.vue"

const { site, theme } = useData()
const { hasSidebar } = useSidebar()
const { currentLang } = useLangs()

const link = computed(() =>
  typeof theme.value.logoLink === "string"
    ? theme.value.logoLink
    : theme.value.logoLink?.link,
)

const rel = computed(() =>
  typeof theme.value.logoLink === "string"
    ? undefined
    : theme.value.logoLink?.rel,
)

const target = computed(() =>
  typeof theme.value.logoLink === "string"
    ? undefined
    : theme.value.logoLink?.target,
)
</script>

<template>
  <div class="VPNavBarTitle" :class="{ 'has-sidebar': hasSidebar }">
    <a
      class="title"
      :href="link ?? normalizeLink(currentLang.link)"
      :rel="rel"
      :target="target"
    >
      <span class="badge start-end" aria-label="1.2">
        <slot name="nav-bar-title-before" />
        <VPImage v-if="theme.logo" class="logo" :image="theme.logo" />
        <template v-if="theme.siteTitle"
          ><span>{{ theme.siteTitle }}</span></template
        >
        <template v-else-if="theme.siteTitle === undefined"
          ><span>{{ site.title }}</span></template
        >
        <slot name="nav-bar-title-after" />
      </span>
    </a>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color-2);
  transition: opacity 0.25s;
  text-decoration: inherit;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }

  .VPNavBarTitle.has-sidebar .title {
    border-bottom-color: var(--vp-c-divider);
  }
}

.badge {
  --_inset-offset: 10px;
}

:deep(.logo) {
  margin-inline-end: 8px;
  height: var(--vp-nav-logo-height);
}
</style>
