import { Stepper, StepperItem } from "opui-css/react"

const check = (
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
    <path d="M18 6 7 17l-5-5" />
    <path d="m22 10-7.5 7.5L13 16" />
  </svg>
)

export default function CustomCheck() {
  return (
    <Stepper aria-label="Checkout steps">
      <StepperItem complete href="#" label="Cart" iconChecked={check} />
      <StepperItem complete href="#" label="Shipping" iconChecked={check} />
      <StepperItem current label="Payment" />
      <StepperItem label="Review" />
    </Stepper>
  )
}
