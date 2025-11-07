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
    class="VPNavScreenMenuGroupLink"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    @click="closeScreen"
  >
    {{ item.text }}
  </VPLink>
</template>

<style scoped>
.VPNavScreenMenuGroupLink {
  display: block;
  margin-inline-start: 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-color-2);
  transition: color 0.25s;
}

.VPNavScreenMenuGroupLink:hover {
  color: var(--primary);
}
</style>
