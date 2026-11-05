/** @jsxImportSource @solidjs/web */
import { Stepper } from "opui-css/solid"

const items = [
  { href: "#", label: "Cart" },
  { href: "#", label: "Shipping" },
  { href: "#", label: "Payment" },
  { href: "#", label: "Review" },
]

export default function Narrow() {
  return (
    <>
      <Stepper
        aria-label="Checkout steps"
        current={2}
        items={items}
        style="max-inline-size: 28rem"
      />
      <Stepper
        aria-label="Checkout steps"
        current={2}
        items={items}
        orientation="horizontal"
        style="max-inline-size: 28rem"
      />
    </>
  )
}
