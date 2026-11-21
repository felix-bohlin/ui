import { Button, Checkbox, TextField } from "opui-css/react"

export default function App() {
  return (
    <form>
      <TextField htmlFor="name" label="Name">
        <input id="name" name="name" />
      </TextField>
      <Checkbox name="subscribe">Subscribe</Checkbox>
      <Button type="submit" variant="filled" color="primary">
        Save
      </Button>
    </form>
  )
}
