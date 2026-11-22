<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field for="field-spread-1" spread>
    <input
      aria-describedby="field-spread-1-start-text"
      id="field-spread-1"
      placeholder="Holly Humbucker"
    />
    <template #label>Name</template>
    <template #start-text
      >Your full name, as the drummer never says it</template
    >
  </Field>

  <Field for="field-spread-2" spread variant="filled">
    <input
      aria-describedby="field-spread-2-start-text field-spread-2-end-text"
      id="field-spread-2"
      placeholder="name@lowend.example"
      type="email"
    />
    <template #label>Email</template>
    <template #start-text>We'll send your gig invites here</template>
    <template #end-text>Use one the band checks.</template>
  </Field>

  <Field for="field-spread-3" label="Band" spread>
    <input
      aria-describedby="field-spread-3-start-text"
      id="field-spread-3"
      required
    />
    <template #start-text>Shown on your gig flyers</template>
  </Field>

  <Field for="field-spread-4" label="Member ID" spread>
    <input
      aria-describedby="field-spread-4-start-text"
      disabled
      id="field-spread-4"
      :value.attr="'BASS-20931'"
    />
    <template #start-text>Assigned when you joined Bassbook</template>
  </Field>

  <Field for="field-spread-5" label="Display name" spread>
    <input
      aria-describedby="field-spread-5-start-text field-spread-5-end-text"
      aria-invalid="true"
      id="field-spread-5"
      :value.attr="'A'"
    />
    <template #start-text>Shown next to your wall posts</template>
    <template #end-text>Enter at least two characters.</template>
  </Field>

  <Field for="field-spread-6" label="Amount" spread>
    <input
      aria-describedby="field-spread-6-start-text field-spread-6-start field-spread-6-end"
      id="field-spread-6"
      placeholder="0.00"
    />
    <template #start-text>Daily gear spending limit</template>
    <template #start>€</template>
    <template #end>EUR</template>
  </Field>

  <Field for="field-spread-7" label="Website" spread variant="filled">
    <input
      aria-describedby="field-spread-7-start-text field-spread-7-start field-spread-7-end-text"
      id="field-spread-7"
      placeholder="example.com"
    />
    <template #start-text>Your band homepage, totally rad</template>
    <template #start>https://</template>
    <template #end-text>Include the domain, like example.com.</template>
  </Field>

  <Field for="field-spread-8" label="Band page" spread>
    <input
      aria-describedby="field-spread-8-start-text field-spread-8-top field-spread-8-bottom"
      id="field-spread-8"
      placeholder="my-band"
    />
    <template #start-text>Used to make your band page URL</template>
    <template #top>bassbook.example/</template>
    <template #bottom>Lowercase letters and dashes only</template>
  </Field>

  <Field for="field-spread-9" label="Secret riff" spread variant="filled">
    <input
      aria-describedby="field-spread-9-start-text field-spread-9-top field-spread-9-start field-spread-9-bottom field-spread-9-end-text"
      id="field-spread-9"
      placeholder="Paste your riff"
      type="password"
    />
    <template #start-text>Locked away from guitarists</template>
    <template #start>
      <svg
        data-icon="lock"
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
  </Field>
</template>
