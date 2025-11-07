<script lang="ts" setup>
import type { DefaultTheme } from "vitepress/theme";
import { useData } from "../composables/data";
import { isActive } from "../../shared/shared";
import VPLink from "./VPLink.vue";

defineProps<{
  item: DefaultTheme.NavItemWithLink;
}>();

const { page } = useData();
</script>

<template>
  <div class="VPMenuLink">
    <VPLink
      :class="{
        active: isActive(
          page.relativePath,
          item.activeMatch || item.link,
          !!item.activeMatch
        ),
      }"
      :href="item.link"
      :target="item.target"
      :rel="item.rel"
    >
      {{ item.text }}
    </VPLink>
  </div>
</template>

<style scoped>
.VPMenuGroup + .VPMenuLink {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 12px 0;
}

.link {
  display: block;
  border-radius: var(--surface-border-radius, 0.25rem);
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-2);
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
}

.link:hover {
  color: var(--primary);
  background-color: var(--vp-c-default-soft);
}

.link.active {
  color: var(--primary);
}
</style>
