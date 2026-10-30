<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea placeholder="Hello, world!" spread>
    <template #label>Message</template>
    <template #start-text
      >You can write your message here. Keep it short, preferably under 100
      characters.</template
    >
  </Textarea>

  <Textarea placeholder="Additional notes..." spread variant="filled">
    <template #label>Notes</template>
    <template #start-text>Add any additional notes or comments</template>
    <template #end-text>Maximum 500 characters</template>
  </Textarea>

  <Textarea label="Required" required spread>
    <template #start-text>You must provide a response</template>
  </Textarea>

  <Textarea disabled label="Disabled" spread>
    <template #start-text>This textarea is disabled</template>
  </Textarea>

  <Textarea error label="Invalid Message" spread>
    <template #start-text>This textarea has an error</template>
    <template #end-text>This value is too short.</template>
  </Textarea>

  <Textarea label="Bio" placeholder="Tell us about yourself..." spread>
    <template #start-text>Shown on your public profile</template>
    <template #start>
      <svg
        aria-hidden="true"
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
    <template #bottom>280 characters left</template>
  </Textarea>

  <Textarea
    label="Release notes"
    placeholder="Markdown supported..."
    spread
    variant="filled"
  >
    <template #start-text>Shown on the changelog page</template>
    <template #top>v1.4.0</template>
    <template #bottom>Saved 2 minutes ago</template>
    <template #end-text>Drafts are auto-saved</template>
  </Textarea>
</template>
