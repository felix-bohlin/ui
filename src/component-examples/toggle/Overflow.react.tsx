import { ToggleButton, ToggleGroup } from "opui-css/react"

export default function Overflow() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--ui-space-4)",
        maxInlineSize: "14rem",
      }}
    >
      <div style={{ display: "grid", gap: "var(--ui-space-1)" }}>
        <p>Wrap</p>
        <ToggleGroup aria-label="Notifications">
          <ToggleButton value="all">Everything</ToggleButton>
          <ToggleButton value="mentions">Mentions</ToggleButton>
          <ToggleButton value="none">Nothing at all</ToggleButton>
        </ToggleGroup>
      </div>
      <div style={{ display: "grid", gap: "var(--ui-space-1)" }}>
        <p>Scroll</p>
        <ToggleGroup aria-label="Notifications" overflow="scroll">
          <ToggleButton value="all">Everything</ToggleButton>
          <ToggleButton value="mentions">Mentions</ToggleButton>
          <ToggleButton value="none">Nothing at all</ToggleButton>
        </ToggleGroup>
      </div>
      <div style={{ display: "grid", gap: "var(--ui-space-1)" }}>
        <p>Shrink</p>
        <ToggleGroup aria-label="Notifications" overflow="shrink">
          <ToggleButton value="all">Everything</ToggleButton>
          <ToggleButton value="mentions">Mentions</ToggleButton>
          <ToggleButton value="none">Nothing at all</ToggleButton>
        </ToggleGroup>
      </div>
    </div>
  )
}
