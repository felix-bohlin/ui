import { Progress } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Progress value={50} max={100} label="Default" />
      <div style="background: var(--surface-2); padding: var(--size-3);">
        <Progress value={50} max={100} label="On surface" />
      </div>
    </>
  )
}
