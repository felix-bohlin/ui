import { Stepper } from "opui-css/react"

export default function Vertical() {
  return (
    <Stepper
      current={2}
      items={[
        { label: "Create your workspace" },
        { label: "Invite your team" },
        { label: "Connect a calendar" },
        { label: "Import your projects" },
        { label: "Set up billing" },
      ]}
      label="Onboarding steps"
      orientation="vertical"
    />
  )
}
