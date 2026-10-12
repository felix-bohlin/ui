<script setup lang="ts">
import {
  TextField,
  TextFieldControl,
  TextFieldEndText,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <TextField>
      <TextFieldLabel>I'm required</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Placeholder" required />
      </TextFieldControl>
    </TextField>
    <TextField variant="filled">
      <TextFieldLabel>So am I!</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Placeholder" required />
      </TextFieldControl>
    </TextField>
  </div>

  <div class="example-row">
    <TextField error>
      <TextFieldLabel>Label</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Placeholder" value="This isn't right" />
      </TextFieldControl>
      <TextFieldEndText>Only double-negatives are allowed.</TextFieldEndText>
    </TextField>
    <TextField error variant="filled">
      <TextFieldLabel>Label</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Placeholder" value="Uh-oh" />
      </TextFieldControl>
      <TextFieldEndText
        >Only letters from the first half of the alphabet are
        allowed.</TextFieldEndText
      >
    </TextField>
  </div>
</template>
