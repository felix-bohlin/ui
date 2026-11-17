import { TextField } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <TextField label="X-small" placeholder="Your name" size="x-small" />
      <TextField label="Small" placeholder="Your name" size="small" />
      <TextField label="Medium" placeholder="Your name" />
      <TextField label="Large" placeholder="Your name" size="large" />
    </>
  )
}
