import { Stepper, StepperItem } from "opui-css/react"

export default function CustomCheck() {
  return (
    <Stepper aria-label="Checkout steps">
      <StepperItem
        complete
        href="#"
        iconComplete={
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
            <path d="M18 6 7 17l-5-5"></path>
            <path d="m22 10-7.5 7.5L13 16"></path>
          </svg>
        }
        label="Cart"
      />
      <StepperItem
        complete
        href="#"
        iconComplete={
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
            <path d="M18 6 7 17l-5-5"></path>
            <path d="m22 10-7.5 7.5L13 16"></path>
          </svg>
        }
        label="Shipping"
      />
      <StepperItem current label="Payment" />
      <StepperItem label="Review" />
    </Stepper>
  )
}
