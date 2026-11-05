/** @jsxImportSource @solidjs/web */
import { Stepper, StepperItem } from "opui-css/solid"

export default function Errors() {
  return (
    <Stepper aria-label="Checkout steps">
      <StepperItem complete href="#" label="Cart" />
      <StepperItem
        description="Check the postcode"
        error
        href="#"
        label="Shipping"
      />
      <StepperItem current label="Payment" />
      <StepperItem label="Review" />
    </Stepper>
  )
}
