/** @jsxImportSource @solidjs/web */
import { createSignal, onSettled, Show } from "solid-js"
import { Button, Callout, CalloutContent, CalloutIcon } from "opui-css/solid"

export default function Dismissible() {
  const [open, setOpen] = createSignal(true)
  let close: HTMLButtonElement | undefined
  let show: HTMLButtonElement | undefined

  function toggle(next: boolean) {
    setOpen(next)
    onSettled(() => (next ? close : show)?.focus())
  }

  return (
    <Show
      when={open()}
      fallback={
        <Button
          onClick={() => toggle(true)}
          ref={(element: HTMLButtonElement) => (show = element)}
          variant="outlined"
        >
          Show the callout again
        </Button>
      }
    >
      <Callout id="callout-dismissible-1" severity="info">
        <CalloutIcon />
        <CalloutContent>
          The new editor is on for everyone. Your drafts from the old one are in
          Settings.
        </CalloutContent>
        <Button
          aria-label="Dismiss"
          onClick={() => toggle(false)}
          ref={(element: HTMLButtonElement) => (close = element)}
          round
          size="small"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
            ></path>
          </svg>
        </Button>
      </Callout>
    </Show>
  )
}
