import { Button, TextField, ToggleButton } from "opui-css/solid"

export default function App() {
  return (
    <form>
      <TextField label="Name" name="name" />
      <ToggleButton name="subscribe">Subscribe</ToggleButton>
      <Button type="submit" variant="filled" color="primary">
        Save
      </Button>
    </form>
  )
}
