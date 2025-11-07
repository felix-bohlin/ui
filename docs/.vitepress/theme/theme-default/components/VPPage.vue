<script setup lang="ts">
import { useSidebar } from "../composables/sidebar"

const { hasAside, leftAside } = useSidebar()
import VPDocAside from "./VPDocAside.vue"
</script>

<template>
  <div class="VPPage">
    <slot name="page-top" />

    <hgroup
      class="container"
      v-if="
        !$frontmatter.hideHeadings &&
        ($frontmatter.overline ||
          $frontmatter.title ||
          $frontmatter.description)
      "
    >
      <p v-if="$frontmatter.overline">{{ $frontmatter.overline }}</p>
      <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
      <p v-if="$frontmatter.description">
        {{ $frontmatter.description }}
      </p>
    </hgroup>

    <div v-if="hasAside" class="aside" :class="{ 'left-aside': leftAside }">
      <div class="aside-curtain" />
      <div class="aside-container">
        <div class="aside-content">
          <VPDocAside>
            <template #aside-top><slot name="aside-top" /></template>
            <template #aside-bottom><slot name="aside-bottom" /></template>
            <template #aside-outline-before
              ><slot name="aside-outline-before"
            /></template>
            <template #aside-outline-after
              ><slot name="aside-outline-after"
            /></template>
            <template #aside-ads-before
              ><slot name="aside-ads-before"
            /></template>
            <template #aside-ads-after
              ><slot name="aside-ads-after"
            /></template>
          </VPDocAside>
        </div>
      </div>
    </div>

    <Content />
    <slot name="page-bottom" />
  </div>
</template>

<style scoped>
.VPPage {
  &:has(hgroup) {
    padding-block: 48px;
  }
}
</style>
