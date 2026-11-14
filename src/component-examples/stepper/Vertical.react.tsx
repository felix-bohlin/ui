import { Stepper } from "opui-css/react"

const items = [
  { label: "Create your profile" },
  { label: "Invite your band" },
  { label: "Connect a gig calendar" },
  { label: "Add your basses" },
  { label: "Try Bassbook Gold" },
]

export default function Vertical() {
  return (
    <Stepper
      aria-label="Onboarding steps"
      current={2}
      items={items}
      orientation="vertical"
    />
  )
}
