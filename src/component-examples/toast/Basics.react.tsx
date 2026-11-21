import { Button, Toaster } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        command="--toast"
        commandfor="toast-basics-1"
        data-toast="Changes saved"
        data-toast-severity="success"
        variant="filled"
      >
        Save changes
      </Button>
      <Toaster id="toast-basics-1" />
    </>
  )
}
