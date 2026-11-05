<script setup lang="ts">
import { Button, CheckboxInput, ListItem, Menu, RadioInput } from "opui-css/vue"
</script>

<template>
  <Button
    command="toggle-popover"
    commandfor="menu-checkable-1"
    variant="outlined"
  >
    View
  </Button>
  <Menu id="menu-checkable-1">
    <ListItem type="checkbox">
      <template #label>Show hidden files</template>
      <template #end>
        <CheckboxInput />
      </template>
    </ListItem>
    <ListItem type="checkbox">
      <template #label>Show file extensions</template>
      <template #end>
        <CheckboxInput checked />
      </template>
    </ListItem>
    <li class="ui-border-top ui-heading" id="menu-checkable-1-sort">Sort by</li>
    <ListItem type="radio">
      <template #label>Name</template>
      <template #end>
        <RadioInput
          aria-describedby="menu-checkable-1-sort"
          checked
          name="menu-checkable-1-sort"
          value="name"
        />
      </template>
    </ListItem>
    <ListItem type="radio">
      <template #label>Date modified</template>
      <template #end>
        <RadioInput
          aria-describedby="menu-checkable-1-sort"
          name="menu-checkable-1-sort"
          value="date"
        />
      </template>
    </ListItem>
    <ListItem type="radio">
      <template #label>Size</template>
      <template #end>
        <RadioInput
          aria-describedby="menu-checkable-1-sort"
          name="menu-checkable-1-sort"
          value="size"
        />
      </template>
    </ListItem>
  </Menu>
</template>
