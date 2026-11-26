<script setup lang="ts">
import { Stepper } from "opui-css/vue"

const items = [
  { label: "Create your workspace" },
  { label: "Invite your team" },
  { label: "Connect a calendar" },
  { label: "Import your projects" },
  { label: "Set up billing" },
]
</script>

<template>
  <Stepper
    aria-label="Onboarding steps"
    :current="2"
    :items="items"
    orientation="vertical"
  />
</template>
