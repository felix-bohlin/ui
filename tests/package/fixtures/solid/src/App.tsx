import { Button, TextField, ToggleButton } from "opui-css/solid"

export default function App() {
  return (
    <form>
      <TextField for="name" label="Name">
        <input id="name" name="name" />
      </TextField>
      <ToggleButton name="subscribe">Subscribe</ToggleButton>
      <Button type="submit" variant="filled" color="primary">
        Save
      </Button>
    </form>
  )
}
