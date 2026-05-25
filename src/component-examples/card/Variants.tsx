import { Card } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Card><p>Text (default)</p></Card>
      <Card variant="elevated"><p>Elevated</p></Card>
      <Card variant="outlined"><p>Outlined</p></Card>
      <Card variant="tonal"><p>Tonal</p></Card>
    </>
  )
}
