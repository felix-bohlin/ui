"use client"

import { Button, Toaster, toast } from "opui-css/react"

export default function Action() {
  return (
    <>
      <Button
        id="toast-action-1-button"
        onClick={() =>
          toast("Conversation archived", {
            action: {
              label: "Undo",
              onClick: () => toast("Conversation restored"),
            },
          })
        }
        variant="filled"
      >
        Archive
      </Button>
      <Toaster id="toast-action-1" />
    </>
  )
}
