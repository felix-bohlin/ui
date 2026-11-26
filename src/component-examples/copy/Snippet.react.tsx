import { Button, Copy, Tooltip, TooltipContent } from "opui-css/react"

export default function Snippet() {
  return (
    <Copy id="copy-snippet-1">
      <pre className="ui-code-block">
        <code>npm install opui-css</code>
      </pre>
      <Tooltip id="copy-snippet-2">
        <Button
          aria-label="Copy"
          command="--copy"
          commandfor="copy-snippet-1"
          interestfor="copy-snippet-2"
          round
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V6h2v14h11v2z"
            ></path>
          </svg>
        </Button>
        <TooltipContent>Copy</TooltipContent>
      </Tooltip>
    </Copy>
  )
}
