<script lang="ts" setup>
import { computed, ref } from "vue";
import VPNavScreenMenuGroupLink from "./VPNavScreenMenuGroupLink.vue";
import VPNavScreenMenuGroupSection from "./VPNavScreenMenuGroupSection.vue";

const props = defineProps<{
  text: string;
  items: any[];
}>();

const isOpen = ref(false);

const groupId = computed(
  () => `NavScreenGroup-${props.text.replace(" ", "-").toLowerCase()}`
);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="VPNavScreenMenuGroup" :class="{ open: isOpen }">
    <button
      class="button"
      :aria-controls="groupId"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="button-text" v-html="text"></span>
      <span class="vpi-plus button-icon" />
    </button>

    <div :id="groupId" class="items">
      <template v-for="item in items" :key="JSON.stringify(item)">
        <div v-if="'link' in item" class="item">
          <VPNavScreenMenuGroupLink :item="item" />
        </div>

        <div v-else-if="'component' in item" class="item">
          <component :is="item.component" v-bind="item.props" screen-menu />
        </div>

        <div v-else class="group">
          <VPNavScreenMenuGroupSection :text="item.text" :items="item.items" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.VPNavScreenMenuGroup {
  border-bottom: 1px solid var(--vp-c-divider);
  height: 48px;
  overflow: hidden;
  transition: border-color 0.5s;
}

.VPNavScreenMenuGroup .items {
  visibility: hidden;
}

.VPNavScreenMenuGroup.open .items {
  visibility: visible;
}

.VPNavScreenMenuGroup.open {
  padding-block-end: 10px;
  height: auto;
}

.VPNavScreenMenuGroup.open .button {
  padding-block-end: 6px;
  color: var(--primary);
}

.VPNavScreenMenuGroup.open .button-icon {
  /*rtl:ignore*/
  transform: rotate(45deg);
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 4px 11px 0;
  width: 100%;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-2);
  transition: color 0.25s;
}

.button:hover {
  color: var(--primary);
}

.button-icon {
  transition: transform 0.25s;
}

.group:first-child {
  padding-block-start: 0px;
}

.group + .group,
.group + .item {
  padding-block-start: 4px;
}
</style>
