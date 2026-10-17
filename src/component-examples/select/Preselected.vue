<script setup lang="ts">
import { ref } from "vue"
import { Select } from "opui-css/vue"

const role = ref("developer")
</script>

<template>
  <Select
    label="Role"
    :items="[
      { text: 'Designer', value: 'designer' },
      { text: 'Developer', value: 'developer' },
      { text: 'Manager', value: 'manager' },
    ]"
    v-model="role"
  />

  <Select
    label="Team"
    :items="[
      { text: 'Design', value: 'design' },
      { selected: true, text: 'Engineering', value: 'engineering' },
      { text: 'Sales', value: 'sales' },
    ]"
  />
</template>
