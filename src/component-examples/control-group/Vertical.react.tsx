import { Button, ControlGroup, Textarea } from "opui-css/react"

const plusIcon = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)

const minusIcon = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)

export default function Vertical() {
  return (
    <>
      <div className="example-row">
        <ControlGroup aria-label="Text size" orientation="vertical">
          <Button aria-label="Increase">{plusIcon}</Button>
          <Button aria-label="Decrease">{minusIcon}</Button>
        </ControlGroup>
        <ControlGroup
          aria-label="Text size"
          orientation="vertical"
          variant="outlined"
        >
          <Button aria-label="Increase">{plusIcon}</Button>
          <Button aria-label="Decrease">{minusIcon}</Button>
        </ControlGroup>
        <ControlGroup
          aria-label="Text size"
          orientation="vertical"
          variant="tonal"
        >
          <Button aria-label="Increase">{plusIcon}</Button>
          <Button aria-label="Decrease">{minusIcon}</Button>
        </ControlGroup>
        <ControlGroup
          aria-label="Text size"
          orientation="vertical"
          variant="filled"
        >
          <Button aria-label="Increase">{plusIcon}</Button>
          <Button aria-label="Decrease">{minusIcon}</Button>
        </ControlGroup>
      </div>

      <div className="example-row">
        <ControlGroup aria-label="Move row" orientation="vertical">
          <Button>Up</Button>
          <Button>Down</Button>
        </ControlGroup>
        <ControlGroup
          aria-label="Move row"
          orientation="vertical"
          variant="outlined"
        >
          <Button>Up</Button>
          <Button>Down</Button>
        </ControlGroup>
        <ControlGroup
          aria-label="Move row"
          orientation="vertical"
          variant="tonal"
        >
          <Button>Up</Button>
          <Button>Down</Button>
        </ControlGroup>
        <ControlGroup
          aria-label="Move row"
          orientation="vertical"
          variant="filled"
        >
          <Button>Up</Button>
          <Button>Down</Button>
        </ControlGroup>
      </div>

      <ControlGroup
        aria-label="Delivery note"
        orientation="vertical"
        variant="filled"
      >
        <Textarea
          hideLabel
          label="Delivery note"
          placeholder="Leave it at the back door"
        />
        <Button>Send note</Button>
      </ControlGroup>
    </>
  )
}
