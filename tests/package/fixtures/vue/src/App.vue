<script setup lang="ts">
import { Button, Checkbox, Field } from "opui-css/vue"
</script>

<template>
  <form>
    <Field for="name" label="Name">
      <input id="name" name="name" />
    </Field>
    <Checkbox name="subscribe">Subscribe</Checkbox>
    <Button type="submit" variant="filled" color="primary">Save</Button>
  </form>
</template>
