<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField spread placeholder="Evil Rabbit">
    <template #label>Name</template>
    <template #description>Provide your full name for identification</template>
  </TextField>

  <TextField spread placeholder="you@example.com" type="email" filled>
    <template #label>Email</template>
    <template #description>We'll use this to contact you</template>
    <template #end-text>Please use a valid email address</template>
  </TextField>

  <TextField spread required label="Required">
    <template #description>You must fill this in</template>
  </TextField>

  <TextField spread disabled label="Disabled">
    <template #description>This field is disabled</template>
  </TextField>

  <TextField spread critical label="Invalid Name">
    <template #description>This field has an error</template>
    <template #end-text>This value is too short.</template>
  </TextField>

  <TextField spread label="Amount" placeholder="0.00">
    <template #description>Daily spending limit</template>
    <template #prefix>¢</template>
    <template #suffix>EUR</template>
  </TextField>

  <TextField spread label="Website" placeholder="example.com" filled>
    <template #description>Your public profile URL</template>
    <template #prefix>https://</template>
    <template #end-text>Must include a valid domain</template>
  </TextField>

  <TextField spread label="Project name" placeholder="my-project">
    <template #description>Used to generate the project URL</template>
    <template #header>acme.dev/</template>
    <template #footer>Lowercase letters and dashes only</template>
  </TextField>

  <TextField
    spread
    filled
    label="API key"
    placeholder="Paste your key"
    type="password"
  >
    <template #description>Stored encrypted at rest</template>
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
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </template>
    <template #header>Secret</template>
    <template #footer>Rotates every 90 days</template>
    <template #end-text>Treat like a password</template>
  </TextField>
</template>
