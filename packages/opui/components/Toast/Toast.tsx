import { onMount, type JSX } from "solid-js"
import { initToastManager } from "../../css/js/toast.js"
import type { Props } from "./types.solid"

export default function Toast(props: Props) {
  onMount(() => {
    initToastManager()
  })

  return (
    <>
      <output
        aria-live="polite"
        id="toast-manager"
        {...{ popover: "manual" }}
        role="status"
        {...props}
      ></output>

      <template id="toast-template">
        <div class="ui-toast" role="alert">
          <span class="ui-icon" data-toast-icon></span>
          <div class="ui-content">
            <div class="ui-title" data-toast-title></div>
            <div class="ui-description" data-toast-description></div>
          </div>
          <button
            aria-label="Close"
            class="ui-close-button"
            data-toast-close
            type="button"
          >
            <svg
              fill="none"
              height="20"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </template>
    </>
  )
}
