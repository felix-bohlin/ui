<script setup lang="ts">
import { Button, Drawer, DrawerFooter, DrawerHeader } from "opui-css/vue"
</script>

<template>
  <Button commandfor="drawer-blurred" command="show-modal"
    >Open Blurred Drawer</Button
  >

  <Drawer
    id="drawer-blurred"
    side="inline-start"
    backdrop="blurred"
    closedby="any"
  >
    <template #header>
      <DrawerHeader commandfor="drawer-blurred" heading="Blurred Backdrop" />
    </template>
    <template #content>
      <p>
        This drawer has a blurred backdrop. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua.
      </p>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </p>
    </template>
    <template #footer
      ><DrawerFooter>
        <Button size="small" commandfor="drawer-blurred" command="close"
          >Close</Button
        >
      </DrawerFooter></template
    >
  </Drawer>
</template>
