<script setup lang="ts">
import { Callout, CalloutContent, CalloutIcon } from "opui-css/vue"

const askFirst = (event: Event) => {
  if (!confirm("Hide this message?")) event.preventDefault()
}
</script>

<template>
  <Callout closeButton closeLabel="Dismiss" severity="info" @dismiss="askFirst">
    <CalloutIcon />
    <CalloutContent>
      The new editor is on for everyone. Your drafts from the old one are in
      Settings.
    </CalloutContent>
  </Callout>
</template>
