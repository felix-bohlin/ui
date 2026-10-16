import { Stepper } from "opui-css/react"

export default function Sizes() {
  return (
    <Stepper
      current={2}
      items={[
        { href: "#cart", label: "Cart" },
        { href: "#shipping", label: "Shipping" },
        { href: "#payment", label: "Payment" },
        { href: "#review", label: "Review" },
      ]}
      label="Checkout steps"
      size="small"
    />
  )
}
