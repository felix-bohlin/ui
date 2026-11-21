"use client"

import { useState } from "react"
import { Button, Textarea } from "opui-css/react"

const initial = "Thanks for the update."

export default function Binding() {
  const [message, setMessage] = useState(initial)

  return (
    <>
      <Textarea htmlFor="textarea-binding-1" label="Message">
        <textarea
          id="textarea-binding-1"
          name="textarea-binding"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
      </Textarea>
      <p className="textarea-binding-text">{message.length} characters</p>
      <Button
        className="textarea-binding-reset"
        onClick={() => setMessage(initial)}
      >
        Reset
      </Button>
    </>
  )
}
