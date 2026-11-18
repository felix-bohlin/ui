<script setup lang="ts">
import {
  FieldGroup,
  FieldLegend,
  Fieldset,
  List,
  ListItem,
  RadioInput,
} from "opui-css/vue"
</script>

<template>
  <Fieldset>
    <FieldLegend>Theme</FieldLegend>
    <FieldGroup>
      <List>
        <ListItem choice="radio">
          <template #label>Dark mode</template>
          <template #end>
            <RadioInput name="theme" value="dark" />
          </template>
        </ListItem>
        <ListItem choice="radio">
          <template #label>Light mode</template>
          <template #end>
            <RadioInput name="theme" value="light" />
          </template>
        </ListItem>
      </List>
    </FieldGroup>
  </Fieldset>
</template>
