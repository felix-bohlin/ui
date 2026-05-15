<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<label
  :class="[
    "toggle-button",
    { selected: pressed, disabled ",
    size,
    className,
  ]}
>
  <input
    aria-pressed={finalType === "checkbox" ? pressed : undefined}
    checked={pressed}
    disabled={disabled}
    id={id}
    name={finalName}
    type={finalType}
    value={value || label}
    
  />
  <slot></slot>
</label>
</template>
