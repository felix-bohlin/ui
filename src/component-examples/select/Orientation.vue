<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
<Select spread>
  <template #label>Country</template>
  <template #description>Select your country of residence</template>
  <option value="">Select a country</option>
  <option>Denmark</option>
  <option>Finland</option>
  <option>Iceland</option>
  <option>Norway</option>
  <option>Sweden</option>
</Select>

<Select spread variant="filled">
  <template #label>Language</template>
  <template #description>Choose your preferred language</template>
  <template #end-text>This affects UI translations</template>
  <option value="">Select a language</option>
  <option>Danish</option>
  <option>Finnish</option>
  <option>Icelandic</option>
  <option>Norwegian</option>
  <option>Swedish</option>
</Select>

<Select spread required>
  <template #label>Required</template>
  <template #description>You must select an option</template>
  <option value="">Select an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</Select>

<Select spread disabled>
  <template #label>Disabled</template>
  <template #description>This select is disabled</template>
  <option>Option 1</option>
</Select>

<Select spread critical>
  <template #label>Invalid Select</template>
  <template #description>This select has an error</template>
  <template #end-text>Please select a valid option.</template>
  <option>Option 1</option>
</Select>

<Select spread>
  <template #label>Currency</template>
  <template #description>Used for billing</template>
  <template #prefix>¢</template>
  <option value="">-</option>
  <option>EUR</option>
  <option>EUR</option>
  <option>SEK</option>
</Select>

<Select spread variant="filled">
  <template #label>Region</template>
  <template #description>Affects data residency and latency</template>
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
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M2 12h20"></path>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  </template>
  <template #end-text>Cannot be changed after deploy</template>
  <option value="">-</option>
  <option>eu-north-1</option>
  <option>us-east-1</option>
  <option>ap-southeast-1</option>
</Select>
</template>
