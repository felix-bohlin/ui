import { Card, CardContent, Stat } from "opui-css/react"

export default function Cards() {
  return (
    <ul
      className="ui-layout-grid ui-stretch"
      style={{ "--_min-inline-size": "11rem" }}
    >
      <li>
        <Card variant="outlined">
          <CardContent>
            <Stat description="3 marked as urgent" label="Open tasks">
              12
            </Stat>
          </CardContent>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <Stat description="Next one on Friday" label="Due this week">
              5
            </Stat>
          </CardContent>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <Stat description="Up from 29 last month" label="Completed">
              38
            </Stat>
          </CardContent>
        </Card>
      </li>
    </ul>
  )
}
