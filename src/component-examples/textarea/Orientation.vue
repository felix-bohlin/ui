<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea spread placeholder="Hello, world!">
    <template #label>Message</template>
    <template #description
      >You can write your message here. Keep it short, preferably under 100
      characters.</template
    >
  </Textarea>

  <Textarea spread placeholder="Additional notes..." filled>
    <template #label>Notes</template>
    <template #description>Add any additional notes or comments</template>
    <template #end-text>Maximum 500 characters</template>
  </Textarea>

  <Textarea spread required label="Required">
    <template #description>You must provide a response</template>
  </Textarea>

  <Textarea spread disabled label="Disabled">
    <template #description>This textarea is disabled</template>
  </Textarea>

  <Textarea spread critical label="Invalid Message">
    <template #description>This textarea has an error</template>
    <template #end-text>This value is too short.</template>
  </Textarea>

  <Textarea spread label="Bio" placeholder="Tell us about yourself...">
    <template #description>Shown on your public profile</template>
    <template #prefix>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        ></path>
        <path
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        ></path>
      </svg>
    </template>
    <template #footer>280 characters left</template>
  </Textarea>

  <Textarea
    spread
    filled
    label="Release notes"
    placeholder="Markdown supported..."
  >
    <template #description>Shown on the changelog page</template>
    <template #header>v1.4.0</template>
    <template #footer>Saved 2 minutes ago</template>
    <template #end-text>Drafts are auto-saved</template>
  </Textarea>
</template>
