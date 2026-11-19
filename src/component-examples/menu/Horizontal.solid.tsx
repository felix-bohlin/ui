/** @jsxImportSource @solidjs/web */
import { Button, Menu } from "opui-css/solid"

export default function Horizontal() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="menu-horizontal-1"
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
