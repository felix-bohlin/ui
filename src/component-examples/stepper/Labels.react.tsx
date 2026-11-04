import { Stepper } from "opui-css/react"

const items = [
  { href: "#", label: "Varukorg" },
  { error: true, href: "#", label: "Leverans" },
  { href: "#", label: "Betalning" },
  { href: "#", label: "Granska" },
]

export default function Labels() {
  return (
    <Stepper
      aria-label="Kassans steg"
      completedLabel=", klar"
      current={2}
      errorLabel=", fel"
      items={items}
      lang="sv"
    />
  )
}
