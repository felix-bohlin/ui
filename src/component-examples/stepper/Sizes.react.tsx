import { Stepper } from "opui-css/react"

const items = [
  { href: "#", label: "Cart" },
  { href: "#", label: "Shipping" },
  { href: "#", label: "Payment" },
  { href: "#", label: "Review" },
]

export default function Sizes() {
  return (
    <Stepper
      aria-label="Checkout steps"
      current={1}
      items={items}
      size="small"
    />
  )
}
