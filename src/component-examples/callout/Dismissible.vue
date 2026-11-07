<script setup lang="ts">
import { nextTick, ref } from "vue"
import { Button, Callout, CalloutContent, CalloutIcon } from "opui-css/vue"

const open = ref(true)

async function toggle(next: boolean) {
  open.value = next
  await nextTick()
  const target = next
    ? document.querySelector("#callout-dismissible-1 > .ui-button")
    : document.getElementById("callout-dismissible-1-show")
  if (target instanceof HTMLElement) target.focus()
}
</script>

<template>
  <Callout v-if="open" id="callout-dismissible-1" severity="info">
    <CalloutIcon />
    <CalloutContent>
      The new editor is on for everyone. Your drafts from the old one are in
      Settings.
    </CalloutContent>
    <Button aria-label="Dismiss" round size="small" @click="toggle(false)">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
        ></path>
      </svg>
    </Button>
  </Callout>
  <Button
    v-else
    id="callout-dismissible-1-show"
    variant="outlined"
    @click="toggle(true)"
  >
    Show the callout again
  </Button>
</template>
