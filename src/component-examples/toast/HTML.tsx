import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <Button
      commandfor="toast-manager"
      command="--show-toast"
      data-title="Default Notification"
    >
      Show Default Toast
    </Button>
  )
}
