import { Card, Divider } from "opui-css/react"

export default function Spacing() {
  return (
    <>
      <Card variant="outlined">
        <div className="ui-content">
          Inside a card, the gap spaces the divider.
        </div>
        <Divider />
        <div className="ui-content">
          Nested deeper, it uses the card's tighter space. <Divider /> So
          everything stays close together.
        </div>
      </Card>

      <div style={{ "--divider-space": "var(--size-1)" }}>
        A custom space on any wrapper <Divider /> reaches every divider inside
        it.
      </div>
    </>
  )
}
