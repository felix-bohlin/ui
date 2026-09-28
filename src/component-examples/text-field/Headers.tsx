import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField
        label="Username"
        placeholder="Enter your name"
        header="Full Name"
      />

      <TextField
        label="Tagline"
        placeholder="A short description"
        footer="0 / 80"
      />
    </>
  )
}
