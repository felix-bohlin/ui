import { Stepper } from "opui-css/react"

const items = [
  { href: "#", label: "Cart" },
  {
    description: "Check the postcode",
    error: true,
    href: "#",
    label: "Shipping",
  },
  { href: "#", label: "Payment" },
  { href: "#", label: "Review" },
]

export default function Errors() {
  return <Stepper aria-label="Checkout steps" current={2} items={items} />
}
