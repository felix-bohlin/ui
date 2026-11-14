import { Textarea } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <Textarea label="X-small" placeholder="Write a message" size="x-small" />
      <Textarea label="Small" placeholder="Write a message" size="small" />
      <Textarea label="Medium" placeholder="Write a message" />
      <Textarea label="Large" placeholder="Write a message" size="large" />
    </>
  )
}
