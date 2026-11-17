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
    <template #label>Forum</template>
    <template #start-text
      >Posts your question where the right bassists hang out.</template
    >
    <option value="">-</option>
    <option>Gear Talk</option>
    <option>Ignored Bassists Anonymous</option>
  </Select>

  <Select disabled spread>
    <template #label>Plan</template>
    <template #start-text>A gift from your band, aww.</template>
    <option>Gold</option>
  </Select>

  <Select error spread>
    <template #label>Payment method</template>
    <template #start-text
      >Bassbook Gold renews on the first of each month.</template
    >
    <template #end-text>This card has expired. Pick another one.</template>
    <option>Visa ending in 4242</option>
    <option>Mastercard ending in 5100</option>
  </Select>

  <Select spread>
    <template #label>Time zone</template>
    <template #start-text>Used for gig and rehearsal reminders.</template>
    <template #start>UTC</template>
    <option>-03:00</option>
    <option>+00:00</option>
    <option>+01:00</option>
    <option>+05:30</option>
    <option>+09:00</option>
  </Select>

  <Select spread variant="filled">
    <template #label>Jam region</template>
    <template #start-text>Less lag means tighter grooves.</template>
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
    <template #end-text>Cannot be changed mid-jam.</template>
    <option value="">-</option>
    <option>Asia</option>
    <option>Europe</option>
    <option>North America</option>
  </Select>
</template>
