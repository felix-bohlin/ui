/** @jsxImportSource @solidjs/web */
import { Button, ButtonGroup, Menu } from "opui-css/solid"

export default function SplitButtonCode() {
  return (
    <ButtonGroup variant="outlined">
      <Button>Save</Button>
      <Button
        aria-label="More save options"
        command="toggle-popover"
        commandfor="button-group-split-button-1"
      >
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Menu
        align="end"
        id="button-group-split-button-1"
        items={[{ label: "Save as draft" }, { label: "Save and publish" }]}
      />
    </ButtonGroup>
  )
}
