/** @jsxImportSource @solidjs/web */
import { Stepper } from "opui-css/solid"

const items = [
  { description: "Name and email", label: "Account" },
  { description: "Free or Pro", label: "Plan" },
  { description: "Card or invoice", label: "Payment" },
  { description: "Start building", label: "Done" },
]

export default function Descriptions() {
  return <Stepper aria-label="Sign-up steps" current={1} items={items} />
}
