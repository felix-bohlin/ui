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
    <>
      <div className="tooltip-alignment-grid">
        {tooltips.map(({ alignment, id, label, text }) => (
          <Tooltip key={id} alignment={alignment} id={id}>
            <Button interestfor={id} commandfor={id} command="toggle-popover">
              {text}
            </Button>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <style>{`
        .tooltip-alignment-grid {
          align-items: center;
          display: grid;
          gap: var(--size-3);
          grid-template-areas:
            ".     top    .  "
            "start .      end"
            ".     bottom .  ";
          justify-items: center;
        }

        .tooltip-alignment-grid > :nth-child(1) {
          grid-area: top;
        }
        .tooltip-alignment-grid > :nth-child(2) {
          grid-area: start;
        }
        .tooltip-alignment-grid > :nth-child(3) {
          grid-area: end;
        }
        .tooltip-alignment-grid > :nth-child(4) {
          grid-area: bottom;
        }
      `}</style>
    </>
  )
}
