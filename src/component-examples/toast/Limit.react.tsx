import { Button, Toaster } from "opui-css/react"

export default function Limit() {
  return (
    <>
      <Button
        command="--toast"
        commandfor="toast-limit-1"
        data-toast="Added to your cart"
        data-toast-severity="success"
        variant="outlined"
      >
        Add to cart
      </Button>
      <Toaster id="toast-limit-1" limit={1} />
    </>
  )
}
