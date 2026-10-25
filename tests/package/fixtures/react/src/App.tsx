import { Button, Checkbox, TextField } from "opui-css/react"

export default function App() {
  return (
    <form>
      <TextField label="Name" name="name" />
      <Checkbox name="subscribe">Subscribe</Checkbox>
      <Button type="submit" variant="filled" color="primary">
        Save
      </Button>
    </form>
  )
}
