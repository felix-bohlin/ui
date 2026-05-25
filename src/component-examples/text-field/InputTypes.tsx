import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="Text" type="text" placeholder="Text input" />
      <TextField label="Email" type="email" placeholder="email@example.com" />
      <TextField label="Password" type="password" placeholder="Password" />
      <TextField label="Number" type="number" placeholder="0" />
    </>
  )
}
