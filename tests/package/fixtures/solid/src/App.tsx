import { Button, Field, ToggleButton } from "opui-css/solid"

export default function App() {
  return (
    <form>
      <Field for="name" label="Name">
        <input id="name" name="name" />
      </Field>
      <ToggleButton name="subscribe">Subscribe</ToggleButton>
      <Button type="submit" variant="filled" color="primary">
        Save
      </Button>
    </form>
  )
}
