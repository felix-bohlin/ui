<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select spread>
    <template #label>Country</template>
    <option value="">-</option>
    <option>Denmark</option>
    <option>Finland</option>
    <option>Iceland</option>
    <option>Norway</option>
    <option>Sweden</option>
  </Select>

  <Select spread variant="filled">
    <template #label>Language</template>
    <template #start-text>Choose your preferred language.</template>
    <template #end-text>This affects UI translations.</template>
    <option value="">-</option>
    <option>Danish</option>
    <option>Finnish</option>
    <option>Icelandic</option>
    <option>Norwegian</option>
    <option>Swedish</option>
  </Select>

  <Select required spread>
    <template #label>Department</template>
    <template #start-text>Routes your request to the right team.</template>
    <option value="">-</option>
    <option>Billing</option>
    <option>Support</option>
  </Select>

  <Select disabled spread>
    <template #label>Plan</template>
    <template #start-text>Managed by your organization.</template>
    <option>Business</option>
  </Select>

  <Select error spread>
    <template #label>Payment method</template>
    <template #start-text>Charged on the first of each month.</template>
    <template #end-text>This card has expired. Pick another one.</template>
    <option>Visa ending in 4242</option>
    <option>Mastercard ending in 5100</option>
  </Select>

  <Select spread>
    <template #label>Time zone</template>
    <template #start-text>Used for reminders and due dates.</template>
    <template #start>UTC</template>
    <option>-03:00</option>
    <option>+00:00</option>
    <option>+01:00</option>
    <option>+05:30</option>
    <option>+09:00</option>
  </Select>

  <Select spread variant="filled">
    <template #label>Region</template>
    <template #start-text>Affects data residency and latency.</template>
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
    <template #end-text>Cannot be changed after deploy.</template>
    <option value="">-</option>
    <option>ap-southeast-1</option>
    <option>eu-north-1</option>
    <option>us-east-1</option>
  </Select>
</template>
