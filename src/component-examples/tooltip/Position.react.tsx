import { Button, Tooltip, TooltipContent } from "opui-css/react"

const tooltips = [
  {
    id: "tooltip-position-1",
    label: "Above",
    positionArea: "block-start",
    text: "Top",
  },
  {
    id: "tooltip-position-2",
    label: "Before",
    positionArea: "inline-start",
    text: "Start",
  },
  {
    id: "tooltip-position-3",
    label: "After",
    positionArea: "inline-end",
    text: "End",
  },
  {
    id: "tooltip-position-4",
    label: "Below",
    positionArea: "block-end",
    text: "Bottom",
  },
]

export default function Position() {
  return (
    <div className="example-compass">
      {tooltips.map(({ id, label, positionArea, text }) => (
        <Tooltip key={id} id={id} positionArea={positionArea}>
          <Button interestfor={id}>{text}</Button>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
