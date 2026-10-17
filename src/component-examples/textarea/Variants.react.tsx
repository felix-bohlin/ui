import { Textarea } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Textarea label="Default" placeholder="Placeholder" />
      <Textarea label="Filled" placeholder="Placeholder" variant="filled" />
    </>
  )
}
