/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Button, Textarea } from "opui-css/solid"

const initial = "Thanks for the update."

export default function Binding() {
  const [message, setMessage] = createSignal(initial)

  return (
    <>
      <Textarea for="textarea-binding-1" label="Message">
        <textarea
          id="textarea-binding-1"
          name="textarea-binding"
          value={message()}
          onInput={(event) => setMessage(event.currentTarget.value)}
        />
      </Textarea>
      <p class="textarea-binding-text">{message().length} characters</p>
      <Button
        class="textarea-binding-reset"
        onClick={() => setMessage(initial)}
      >
        Reset
      </Button>
    </>
  )
}
