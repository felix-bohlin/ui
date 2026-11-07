import { Button, Toaster } from "opui-css/react"

export default function Position() {
  return (
    <>
      <div className="example-row">
        <Button
          command="--toast"
          commandfor="toast-position-1"
          data-toast="Top start"
          variant="outlined"
        >
          Top start
        </Button>
        <Button
          command="--toast"
          commandfor="toast-position-2"
          data-toast="Top center"
          variant="outlined"
        >
          Top center
        </Button>
        <Button
          command="--toast"
          commandfor="toast-position-3"
          data-toast="Top end"
          variant="outlined"
        >
          Top end
        </Button>
      </div>
      <div className="example-row">
        <Button
          command="--toast"
          commandfor="toast-position-4"
          data-toast="Bottom start"
          variant="outlined"
        >
          Bottom start
        </Button>
        <Button
          command="--toast"
          commandfor="toast-position-5"
          data-toast="Bottom center"
          variant="outlined"
        >
          Bottom center
        </Button>
        <Button
          command="--toast"
          commandfor="toast-position-6"
          data-toast="Bottom end"
          variant="outlined"
        >
          Bottom end
        </Button>
      </div>
      <Toaster align="start" id="toast-position-1" side="block-start" />
      <Toaster align="center" id="toast-position-2" side="block-start" />
      <Toaster id="toast-position-3" side="block-start" />
      <Toaster align="start" id="toast-position-4" />
      <Toaster align="center" id="toast-position-5" />
      <Toaster id="toast-position-6" />
    </>
  )
}
