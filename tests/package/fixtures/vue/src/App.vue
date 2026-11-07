<script setup lang="ts">
import { Button, Checkbox, TextField } from "opui-css/vue"
</script>

<template>
  <form>
    <TextField label="Name" name="name" />
    <Checkbox name="subscribe">Subscribe</Checkbox>
    <Button type="submit" variant="filled" color="primary">Save</Button>
  </form>
</template>
