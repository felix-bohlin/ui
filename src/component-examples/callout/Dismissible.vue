<script setup lang="ts">
import { Callout, CalloutContent, CalloutIcon } from "opui-css/vue"
</script>

<template>
  <Callout closeLabel="Dismiss" dismissible severity="info">
    <CalloutIcon />
    <CalloutContent>
      The new editor is on for everyone. Your drafts from the old one are in
      Settings.
    </CalloutContent>
  </Callout>
</template>
