/** @jsxImportSource @solidjs/web */
import { Button } from "opui-css/solid"

export default function Keyboard() {
  return (
    <>
      <Button>
        Terminal
        <kbd>Ctrl+Alt+T</kbd>
      </Button>
      <Button variant="outlined">
        Spotlight
        <kbd>⌘Space</kbd>
      </Button>
      <Button variant="tonal">
        Lock
        <kbd>Win+L</kbd>
      </Button>
    </>
  )
}
