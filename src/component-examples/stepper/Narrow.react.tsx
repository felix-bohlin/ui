import { Stepper } from "opui-css/react"

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
        style={{ maxInlineSize: "28rem" }}
      />
      <Stepper
        aria-label="Checkout steps"
        current={2}
        items={items}
        orientation="horizontal"
        style={{ maxInlineSize: "28rem" }}
      />
    </>
  )
}
