import { Progress } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Progress value={25} max={100} label="Loading..." />
      <Progress value={50} max={100} label="Loading..." />
      <Progress value={75} max={100} label="Loading..." />
    </>
  )
}
