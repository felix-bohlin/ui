import { Button, Menu } from "opui-css/react"

export default function Current() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="menu-current-1"
        variant="outlined"
      >
        Language
      </Button>
      <Menu
        id="menu-current-1"
        items={[
          { "aria-current": "true", label: "English", lang: "en" },
          { label: "Svenska", lang: "sv" },
          { label: "Deutsch", lang: "de" },
        ]}
      />
    </>
  )
}
