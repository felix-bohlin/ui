<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme"
import VPImage from "./VPImage.vue"
import VPLink from "./VPLink.vue"

defineProps<{
  icon?: DefaultTheme.FeatureIcon
  title: string
  details?: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}>()
</script>

<template>
  <VPLink
    class="VPFeature"
    :href="link"
    :rel="rel"
    :target="target"
    :no-icon="true"
    :tag="link ? 'a' : 'div'"
  >
    <article class="card outlined">
      <div class="content">
        <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
          <VPImage
            :image="icon"
            :alt="icon.alt"
            :height="icon.height || 48"
            :width="icon.width || 48"
          />
        </div>
        <VPImage
          v-else-if="typeof icon === 'object'"
          :image="icon"
          :alt="icon.alt"
          :height="icon.height || 48"
          :width="icon.width || 48"
        />
        <div v-else-if="icon" class="icon" v-html="icon"></div>
        <h2 class="title" v-html="title"></h2>
        <p v-if="details" class="details" v-html="details"></p>

        <div v-if="linkText" class="link-text">
          <p class="link-text-value">
            {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
          </p>
        </div>
      </div>
    </article>
  </VPLink>
</template>

<style scoped>
.VPFeature {
  display: block;
  height: 100%;
}

.VPFeature.link:hover {
  border-color: var(--primary);
}

.card {
  height: 100%;
  & > :deep(.VPImage) {
    margin-block-end: 20px;
  }
}

.icon {
  align-items: center;
  background-color: var(--vp-c-default-soft);
  border-radius: var(--surface-border-radius, 0.25rem);
  color: var(--primary);
  display: flex;
  font-size: 24px;
  height: 48px;
  justify-content: center;
  margin-block-end: 20px;
  transition: background-color 0.25s;
  width: 48px;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.details {
  flex-grow: 1;
  padding-block-start: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-2-78);
  text-wrap: balance;
}

.link-text {
  padding-block-start: 8px;
}

.link-text-value {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--primary);
}

.link-text-icon {
  margin-inline-start: 6px;
}
</style>
