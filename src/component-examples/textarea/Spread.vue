<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea placeholder="Hi, I have a question about my order." spread>
    <template #label>Message</template>
    <template #start-text>Keep it under 100 characters.</template>
  </Textarea>

  <Textarea placeholder="Additional notes..." spread variant="filled">
    <template #label>Notes</template>
    <template #start-text>Add any additional notes or comments</template>
    <template #end-text>Only your team sees these.</template>
  </Textarea>

  <Textarea label="Reason for return" required spread>
    <template #start-text>Helps us improve our products</template>
  </Textarea>

  <Textarea disabled label="Order notes" spread>
    <template #start-text>Orders can't change once they ship</template>
  </Textarea>

  <Textarea error label="Review" spread value="Great">
    <template #start-text>Shown with your rating</template>
    <template #end-text>Write at least 20 characters.</template>
  </Textarea>

  <Textarea
    characterCount
    label="Bio"
    :maxlength="280"
    placeholder="Tell us about yourself..."
    spread
  >
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
    <template #end-text>Drafts save automatically.</template>
  </Textarea>
</template>
