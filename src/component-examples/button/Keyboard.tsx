import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button>
        Search <kbd>⌘K</kbd>
      </Button>
      <Button variant="outlined">
        Save <kbd>⌘S</kbd>
      </Button>
      <Button variant="tonal">
        Copy <kbd>⌘C</kbd>
      </Button>
      <Button variant="filled">
        Delete <kbd>⌘⌫</kbd>
      </Button>
    </>
  )
}
