import { Stepper } from "opui-css/react"

export default function Complete() {
  return (
    <Stepper
      current={4}
      items={[
        { href: "#cart", label: "Cart" },
        { href: "#shipping", label: "Shipping" },
        { href: "#payment", label: "Payment" },
        { href: "#review", label: "Review" },
      ]}
      label="Checkout steps"
    />
  )
}
