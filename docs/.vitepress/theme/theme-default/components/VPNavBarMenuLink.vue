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
  <VPLink
    :class="{
      VPNavBarMenuLink: true,
      active: isActive(
        page.relativePath,
        item.activeMatch || item.link,
        !!item.activeMatch
      ),
    }"
    :href="item.link"
    :noIcon="item.noIcon"
    :target="item.target"
    :rel="item.rel"
    tabindex="0"
  >
    <span v-html="item.text"></span>
  </VPLink>
</template>

<style scoped>
.VPNavBarMenuLink {
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-2);
  transition: color 0.25s;
  text-decoration: none;
}

.VPNavBarMenuLink.active {
  color: var(--primary);
}

.VPNavBarMenuLink:hover {
  color: var(--primary);
}
</style>
