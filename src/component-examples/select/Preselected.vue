<script setup lang="ts">
import { ref } from "vue"
import { Select } from "opui-css/vue"

const role = ref("developer")
</script>

<template>
  <Select
    label="Role"
    :items="[
      { label: 'Designer', value: 'designer' },
      { label: 'Developer', value: 'developer' },
      { label: 'Manager', value: 'manager' },
    ]"
    v-model="role"
  />

  <Select
    label="Team"
    :items="[
      { label: 'Design', value: 'design' },
      { label: 'Engineering', selected: true, value: 'engineering' },
      { label: 'Sales', value: 'sales' },
    ]"
  />
</template>
