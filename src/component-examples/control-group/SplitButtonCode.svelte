<script lang="ts">
  import { Button, ControlGroup, Menu } from "opui-css/svelte"
</script>

<ControlGroup aria-label="Save options" variant="outlined">
  <Button>Save</Button>
  <Button
    aria-label="More save options"
    command="toggle-popover"
    commandfor="control-group-split-button-1"
  >
    <svg aria-hidden="true"><!-- --></svg>
  </Button>
  <Menu
    align="end"
    id="control-group-split-button-1"
    items={[{ label: "Save as draft" }, { label: "Save and publish" }]}
  />
</ControlGroup>
