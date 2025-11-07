<script setup lang="ts">
defineProps<{
  severity?: "error" | "ok" | "warning"
  title?: string
  variant?: "outlined"
}>()

const iconPath = {
  ok: "M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4",
  warning:
    "M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z",
  error:
    "M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5",
}

const viewBox = {
  error: "0 0 48 48",
  warning: "0 0 32 32",
  ok: "0 0 32 32",
}
</script>

<template>
  <article role="alert" class="alert" :class="[severity, variant]">
    <template v-if="severity && severity in iconPath">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        :viewBox="viewBox[severity]"
      >
        <path fill="currentColor" :d="iconPath[severity]" />
      </svg>
    </template>
    <slot v-else name="icon"></slot>

    <div v-if="title || $slots.title || $slots.default" class="content">
      <h3 v-if="title || $slots.title">
        <template v-if="title">{{ title }}</template>
        <slot v-else name="title"></slot>
      </h3>
      <slot></slot>
    </div>
  </article>
</template>
