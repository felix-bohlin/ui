<script lang="ts" setup>
import VPMenuLink from "./VPMenuLink.vue";

defineProps<{
  text?: string;
  items: any[];
}>();
</script>

<template>
  <div class="VPMenuGroup">
    <p v-if="text" class="title">{{ text }}</p>

    <template v-for="item in items">
      <VPMenuLink v-if="'link' in item" :item="item" />
    </template>
  </div>
</template>

<style scoped>
.VPMenuGroup {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 12px 0;
}

.VPMenuGroup:first-child {
  margin-block-start: 0;
  border-top: 0;
  padding-block-start: 0;
}

.VPMenuGroup + .VPMenuGroup {
  margin-block-start: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.title {
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color-2-78);
  white-space: nowrap;
  transition: color 0.25s;
}
</style>
