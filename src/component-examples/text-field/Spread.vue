<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField placeholder="Holly Humbucker" spread>
    <template #label>Name</template>
    <template #start-text
      >Your full name, as the drummer never says it</template
    >
  </TextField>

  <TextField
    placeholder="name@lowend.example"
    spread
    type="email"
    variant="filled"
  >
    <template #label>Email</template>
    <template #start-text>We'll send your gig invites here</template>
    <template #end-text>Use one the band checks.</template>
  </TextField>

  <TextField label="Band" required spread>
    <template #start-text>Shown on your gig flyers</template>
  </TextField>

  <TextField disabled label="Member ID" spread value="BASS-20931">
    <template #start-text>Assigned when you joined Bassbook</template>
  </TextField>

  <TextField error label="Display name" spread value="A">
    <template #start-text>Shown next to your wall posts</template>
    <template #end-text>Enter at least two characters.</template>
  </TextField>

  <TextField label="Amount" placeholder="0.00" spread>
    <template #start-text>Daily gear spending limit</template>
    <template #start>€</template>
    <template #end>EUR</template>
  </TextField>

  <TextField label="Website" placeholder="example.com" spread variant="filled">
    <template #start-text>Your band homepage, totally rad</template>
    <template #start>https://</template>
    <template #end-text>Include the domain, like example.com.</template>
  </TextField>

  <TextField label="Band page" placeholder="my-band" spread>
    <template #start-text>Used to make your band page URL</template>
    <template #top>bassbook.example/</template>
    <template #bottom>Lowercase letters and dashes only</template>
  </TextField>

  <TextField
    label="Secret riff"
    placeholder="Paste your riff"
    spread
    type="password"
    variant="filled"
  >
    <template #start-text>Locked away from guitarists</template>
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
    <template #bottom>Changes every 90 days</template>
    <template #end-text>Never show it to the drummer.</template>
  </TextField>
</template>
