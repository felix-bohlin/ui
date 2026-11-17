import { Card, CardContent, Divider } from "opui-css/react"

export default function Spacing() {
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          Order 1042 from Fretless Fiona's Bass Barn, placed on 3 March.
        </CardContent>
        <Divider />
        <CardContent>
          Two sets of flatwounds: €98
          <Divider />
          Shipping: free
        </CardContent>
      </Card>

      <div style={{ "--ui-divider-gap": "var(--ui-space-1)" }}>
        Ships to Lou Headstock, Low End Lane
        <Divider />
        Arrives in 2 to 4 days
      </div>
    </>
  )
}
