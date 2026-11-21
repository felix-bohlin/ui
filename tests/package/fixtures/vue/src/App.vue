<script setup lang="ts">
import { Button, Checkbox, TextField } from "opui-css/vue"
</script>

<template>
  <form>
    <TextField for="name" label="Name">
      <input id="name" name="name" />
    </TextField>
    <Checkbox name="subscribe">Subscribe</Checkbox>
    <Button type="submit" variant="filled" color="primary">Save</Button>
  </form>
</template>
