import { Avatar } from "opui-css/solid"

export default function Example() {
  return (
    <Avatar isGroup>
      <Avatar>AB</Avatar>
      <Avatar>CD</Avatar>
      <Avatar as="button">EF</Avatar>
      <Avatar as="button">GH</Avatar>
      <Avatar href="#">IJ</Avatar>
      <Avatar href="#">KL</Avatar>
    </Avatar>
  )
}
