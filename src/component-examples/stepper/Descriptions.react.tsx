import { Stepper } from "opui-css/react"

const items = [
  { description: "Name and email", label: "Account" },
  { description: "Basic or Gold", label: "Plan" },
  { description: "Card or gig money", label: "Payment" },
  { description: "Start jamming", label: "Done" },
]

export default function Descriptions() {
  return <Stepper aria-label="Sign-up steps" current={1} items={items} />
}
