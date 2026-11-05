/** @jsxImportSource @solidjs/web */
import { Button, Toaster } from "opui-css/solid"

export default function Duration() {
  return (
    <>
      <Button
        command="--toast"
        commandfor="toast-duration-1"
        data-toast="Export started. You'll get an email when the file is ready."
        variant="filled"
      >
        Export report
      </Button>
      <Toaster duration={10000} id="toast-duration-1" />
    </>
  )
}
