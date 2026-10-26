<script setup lang="ts">
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/vue"
import { ref } from "vue"

const closedby = ref<"any" | "closerequest" | "none">("any")
</script>

<template>
  <Button
    commandfor="drawer-close-behaviors-1"
    command="show-modal"
    variant="outlined"
  >
    Open drawer
  </Button>

  <Drawer id="drawer-close-behaviors-1" scrollLock :closedby="closedby">
    <DrawerHeader>
      <DrawerTitle>How to close</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <Fieldset>
        <FieldLegend>Choose a closing behavior:</FieldLegend>
        <FieldGroup name="closedby-demo">
          <Radio v-model="closedby" value="any">any</Radio>
          <Radio v-model="closedby" value="closerequest">closerequest</Radio>
          <Radio v-model="closedby" value="none">none</Radio>
        </FieldGroup>
      </Fieldset>
    </DrawerContent>
    <DrawerFooter>
      <Button
        size="small"
        commandfor="drawer-close-behaviors-1"
        command="close"
      >
        Close manually
      </Button>
    </DrawerFooter>
  </Drawer>
</template>
