<script lang="ts" setup>
import type { DefaultTheme } from "vitepress/theme";
import { inject } from "vue";
import VPLink from "./VPLink.vue";

defineProps<{
  item: DefaultTheme.NavItemWithLink;
}>();

const closeScreen = inject("close-screen") as () => void;
</script>

<template>
  <VPLink
    class="VPNavScreenMenuLink"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    @click="closeScreen"
    v-html="item.text"
  />
</template>

<style scoped>
.VPNavScreenMenuLink {
  display: block;
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 12px 0 11px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-2);
  transition:
    border-color 0.25s,
    color 0.25s;
}

.VPNavScreenMenuLink:hover {
  color: var(--primary);
}
</style>
