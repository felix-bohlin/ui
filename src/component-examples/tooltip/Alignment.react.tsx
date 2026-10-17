import { Button, Tooltip, TooltipContent } from "opui-css/react"

const tooltips = [
  { alignment: "block-start", id: "tooltip-top", label: "Above", text: "Top" },
  {
    alignment: "inline-start",
    id: "tooltip-start",
    label: "Before",
    text: "Start",
  },
  { alignment: "inline-end", id: "tooltip-end", label: "After", text: "End" },
  {
    alignment: "block-end",
    id: "tooltip-bottom",
    label: "Below",
    text: "Bottom",
  },
]

export default function Alignment() {
  return (
    <div className="example-compass">
      {tooltips.map(({ alignment, id, label, text }) => (
        <Tooltip key={id} alignment={alignment} id={id}>
          <Button interestfor={id} commandfor={id} command="toggle-popover">
            {text}
          </Button>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
