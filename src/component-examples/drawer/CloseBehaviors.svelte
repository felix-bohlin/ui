<script lang="ts">
  import {
    Button,
    Drawer,
    DrawerContent,
    DrawerActions,
    DrawerHeader,
    DrawerTitle,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Radio,
  } from "opui-css/svelte"

  let closedby = $state<"any" | "closerequest" | "none">("any")
</script>

<Button
  commandfor="drawer-close-behaviors-1"
  command="show-modal"
  variant="outlined"
>
  Open drawer
</Button>

<Drawer id="drawer-close-behaviors-1" scrollLock {closedby}>
  <DrawerHeader>
    <DrawerTitle>How to close</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <FieldSet>
      <FieldLegend>Choose a closing behavior:</FieldLegend>
      <FieldGroup name="closedby-demo">
        <Radio bind:group={closedby} value="any">any</Radio>
        <Radio bind:group={closedby} value="closerequest">closerequest</Radio>
        <Radio bind:group={closedby} value="none">none</Radio>
      </FieldGroup>
    </FieldSet>
  </DrawerContent>
  <DrawerActions>
    <Button size="small" commandfor="drawer-close-behaviors-1" command="close">
      Close manually
    </Button>
  </DrawerActions>
</Drawer>
