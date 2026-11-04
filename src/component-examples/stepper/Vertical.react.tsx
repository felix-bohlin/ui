import { Stepper } from "opui-css/react"

const items = [
  { label: "Create your workspace" },
  { label: "Invite your team" },
  { label: "Connect a calendar" },
  { label: "Import your projects" },
  { label: "Set up billing" },
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
