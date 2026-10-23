<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select spread>
    <template #label>Country</template>
    <template #start-text>Select your country of residence</template>
    <option value="">Select a country</option>
    <option>Denmark</option>
    <option>Finland</option>
    <option>Iceland</option>
    <option>Norway</option>
    <option>Sweden</option>
  </Select>

  <Select spread variant="filled">
    <template #label>Language</template>
    <template #start-text>Choose your preferred language</template>
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
    <template #start-text>You must select an option</template>
    <option value="">Select an option</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </Select>

  <Select spread disabled>
    <template #label>Disabled</template>
    <template #start-text>This select is disabled</template>
    <option>Option 1</option>
  </Select>

  <Select spread error>
    <template #label>Invalid Select</template>
    <template #start-text>This select has an error</template>
    <template #end-text>Please select a valid option.</template>
    <option>Option 1</option>
  </Select>

  <Select spread>
    <template #label>Time zone</template>
    <template #start-text>Used for reminders and due dates</template>
    <template #start>UTC</template>
    <option>-03:00</option>
    <option>+00:00</option>
    <option>+01:00</option>
    <option>+05:30</option>
    <option>+09:00</option>
  </Select>

  <Select spread variant="filled">
    <template #label>Region</template>
    <template #start-text>Affects data residency and latency</template>
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
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M2 12h20"></path>
        <path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        ></path>
      </svg>
    </template>
    <template #end-text>Cannot be changed after deploy</template>
    <option value="">-</option>
    <option>ap-southeast-1</option>
    <option>eu-north-1</option>
    <option>us-east-1</option>
  </Select>
</template>
