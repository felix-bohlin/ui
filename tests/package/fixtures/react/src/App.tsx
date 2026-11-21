import { Button, Checkbox, Field } from "opui-css/react"

export default function App() {
  return (
    <form>
      <Field htmlFor="name" label="Name">
        <input id="name" name="name" />
      </Field>
      <Checkbox name="subscribe">Subscribe</Checkbox>
      <Button type="submit" variant="filled" color="primary">
        Save
      </Button>
    </form>
  )
}
