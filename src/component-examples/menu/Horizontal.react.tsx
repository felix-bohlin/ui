import { Button, Menu } from "opui-css/react"

export default function Horizontal() {
  return (
    <>
      <Button
        commandfor="menu-horizontal-1"
        command="toggle-popover"
        variant="outlined"
      >
        React
      </Button>
      <Menu
        id="menu-horizontal-1"
        items={[
          { "aria-label": "Thumbs up", label: "👍", value: "+1" },
          { "aria-label": "Heart", label: "❤️", value: "heart" },
          { "aria-label": "Laughing", label: "😂", value: "joy" },
          { "aria-label": "Party", label: "🎉", value: "tada" },
          { "aria-label": "Eyes", label: "👀", value: "eyes" },
        ]}
        orientation="horizontal"
      />
    </>
  )
}
