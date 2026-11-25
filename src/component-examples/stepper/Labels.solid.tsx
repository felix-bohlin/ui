/** @jsxImportSource @solidjs/web */
import { Stepper } from "opui-css/solid"

const items = [
  { href: "#", label: "Varukorg" },
  { href: "#", label: "Leverans", state: "error" as const },
  { href: "#", label: "Betalning" },
  { href: "#", label: "Granska" },
]

export default function Labels() {
  return (
    <Stepper
      aria-label="Kassans steg"
      completeLabel=", klar"
      current={2}
      errorLabel=", fel"
      items={items}
      lang="sv"
    />
  )
}
