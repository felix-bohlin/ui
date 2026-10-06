import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Textarea label="X-small" placeholder="Placeholder" size="x-small" />
      <Textarea label="Small" placeholder="Placeholder" size="small" />
      <Textarea label="Default" placeholder="Placeholder" />
      <Textarea label="Large" placeholder="Placeholder" size="large" />
    </>
  )
}
