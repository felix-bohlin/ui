/** @jsxImportSource @solidjs/web */
import { Button, Toaster, toast } from "opui-css/solid"

export default function Script() {
  return (
    <>
      <Button
        id="toast-script-1-button"
        onClick={() => toast.success("Changes saved")}
        variant="filled"
      >
        Save changes
      </Button>
      <Toaster id="toast-script-1" />
    </>
  )
}
