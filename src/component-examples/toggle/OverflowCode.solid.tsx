/** @jsxImportSource @solidjs/web */
import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function OverflowCode() {
  return (
    <>
      <ToggleGroup aria-label="Notifications" multiple name="overflow-wrap">
        <ToggleButton value="all">Everything</ToggleButton>
        <ToggleButton value="mentions">Mentions</ToggleButton>
        <ToggleButton value="none">Nothing at all</ToggleButton>
      </ToggleGroup>
      <ToggleGroup
        aria-label="Notifications"
        multiple
        name="overflow-scroll"
        overflow="scroll"
      >
        <ToggleButton value="all">Everything</ToggleButton>
        <ToggleButton value="mentions">Mentions</ToggleButton>
        <ToggleButton value="none">Nothing at all</ToggleButton>
      </ToggleGroup>
      <ToggleGroup
        aria-label="Notifications"
        multiple
        name="overflow-shrink"
        overflow="shrink"
      >
        <ToggleButton value="all">Everything</ToggleButton>
        <ToggleButton value="mentions">Mentions</ToggleButton>
        <ToggleButton value="none">Nothing at all</ToggleButton>
      </ToggleGroup>
    </>
  )
}
