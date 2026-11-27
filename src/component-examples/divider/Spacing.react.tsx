import { Card, CardContent, Divider } from "opui-css/react"

export default function Spacing() {
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          Order 1042 from Fretless Tal's Bass Barn, placed on 3 March.
        </CardContent>
        <Divider />
        <CardContent>
          Two sets of flatwounds: €98
          <Divider />
          Shipping: free
        </CardContent>
      </Card>

      <div style={{ "--ui-divider-gap": "var(--ui-space-1)" }}>
        Ships to Kinga Headstock, Fretboard Lane
        <Divider />
        Arrives in 2 to 4 days
      </div>
    </>
  )
}
