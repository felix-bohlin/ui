<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField placeholder="Evil Rabbit" spread>
    <template #label>Name</template>
    <template #start-text>Provide your full name for identification</template>
  </TextField>

  <TextField placeholder="you@example.com" spread type="email" variant="filled">
    <template #label>Email</template>
    <template #start-text>We'll use this to contact you</template>
    <template #end-text>Please use a valid email address</template>
  </TextField>

  <TextField label="Required" required spread>
    <template #start-text>You must fill this in</template>
  </TextField>

  <TextField disabled label="Disabled" spread>
    <template #start-text>This field is disabled</template>
  </TextField>

  <TextField error label="Invalid Name" spread>
    <template #start-text>This field has an error</template>
    <template #end-text>Enter at least two characters.</template>
  </TextField>

  <TextField label="Amount" placeholder="0.00" spread>
    <template #start-text>Daily spending limit</template>
    <template #start>€</template>
    <template #end>EUR</template>
  </TextField>

  <TextField label="Website" placeholder="example.com" spread variant="filled">
    <template #start-text>Your public profile URL</template>
    <template #start>https://</template>
    <template #end-text>Must include a valid domain</template>
  </TextField>

  <TextField label="Project name" placeholder="my-project" spread>
    <template #start-text>Used to generate the project URL</template>
    <template #top>acme.dev/</template>
    <template #bottom>Lowercase letters and dashes only</template>
  </TextField>

  <TextField
    label="API key"
    placeholder="Paste your key"
    spread
    type="password"
    variant="filled"
  >
    <template #start-text>Stored encrypted at rest</template>
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
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </template>
    <template #top>Secret</template>
    <template #bottom>Rotates every 90 days</template>
    <template #end-text>Treat like a password</template>
  </TextField>
</template>
