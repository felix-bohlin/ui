<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme"
import { computed } from "vue"
import VPFeature from "./VPFeature.vue"

export interface Feature {
  icon?: DefaultTheme.FeatureIcon
  title: string
  details: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}

const props = defineProps<{
  features: Feature[]
}>()

const grid = computed(() => {
  const length = props.features.length

  if (!length) {
    return
  } else if (length === 2) {
    return "grid-2"
  } else if (length === 3) {
    return "grid-3"
  } else if (length % 3 === 0) {
    return "grid-6"
  } else if (length > 3) {
    return "grid-4"
  }
})
</script>

<template>
  <div v-if="features" class="VPFeatures">
    <div class="vp-container">
      <div class="items">
        <VPFeature
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :details="feature.details"
          :link="feature.link"
          :link-text="feature.linkText"
          :rel="feature.rel"
          :target="feature.target"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPFeatures {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPFeatures {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPFeatures {
    padding: 0 64px;
  }
}

.vp-container {
  margin: 0 auto;
  max-width: 1152px;
}

.items {
  display: grid;
  gap: var(--size-3, 1rem);
  grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
}
</style>
