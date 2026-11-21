import { Stepper } from "opui-css/react"

const items = [
  { href: "#", label: "Cart" },
  { href: "#", label: "Shipping" },
  { href: "#", label: "Payment" },
  { href: "#", label: "Review" },
]

export default function Complete() {
  return <Stepper aria-label="Checkout steps" complete items={items} />
}
