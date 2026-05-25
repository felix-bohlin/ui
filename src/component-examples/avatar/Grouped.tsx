import { Avatar } from "opui-css/solid"

export default function Example() {
  return (
    <div class="avatar-group">
      <Avatar src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=200&auto=format&fit=crop" alt="User 1" />
      <Avatar src="https://plus.unsplash.com/premium_photo-1770631651199-d92007477b6f?q=80&w=200&auto=format&fit=crop" alt="User 2" />
      <Avatar>AB</Avatar>
    </div>
  )
}
