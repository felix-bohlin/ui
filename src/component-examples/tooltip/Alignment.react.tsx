import { Button, Tooltip, TooltipContent } from "opui-css/react"

const tooltips = [
  {
    alignment: "block-start",
    id: "tooltip-alignment-1",
    label: "Above",
    text: "Top",
  },
  {
    alignment: "inline-start",
    id: "tooltip-alignment-2",
    label: "Before",
    text: "Start",
  },
  {
    alignment: "inline-end",
    id: "tooltip-alignment-3",
    label: "After",
    text: "End",
  },
  {
    alignment: "block-end",
    id: "tooltip-alignment-4",
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
