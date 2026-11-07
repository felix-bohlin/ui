<script setup lang="ts">
import { ref } from "vue"
import { Chip } from "opui-css/vue"

const pressed = ref(["open", "paid"])

function toggle(value: string) {
  pressed.value = pressed.value.includes(value)
    ? pressed.value.filter((item) => item !== value)
    : [...pressed.value, value]
}
</script>

<template>
  <div class="example-row">
    <Chip
      :aria-pressed="pressed.includes('open')"
      as="button"
      class="chip-pressed"
      label="Open"
      variant="outlined"
      @click="toggle('open')"
    />
    <Chip
      :aria-pressed="pressed.includes('in-review')"
      as="button"
      class="chip-pressed"
      label="In review"
      variant="outlined"
      @click="toggle('in-review')"
    />
    <Chip
      :aria-pressed="pressed.includes('closed')"
      as="button"
      class="chip-pressed"
      label="Closed"
      variant="outlined"
      @click="toggle('closed')"
    />
  </div>
  <div class="example-row">
    <Chip
      :aria-pressed="pressed.includes('paid')"
      as="button"
      class="chip-pressed"
      label="Paid"
      @click="toggle('paid')"
    />
    <Chip
      :aria-pressed="pressed.includes('unpaid')"
      as="button"
      class="chip-pressed"
      label="Unpaid"
      @click="toggle('unpaid')"
    />
  </div>
</template>
