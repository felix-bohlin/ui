/** @jsxImportSource @solidjs/web */
import {
  Card,
  CardContent,
  CardHeader,
  Timeline,
  TimelineItem,
} from "opui-css/solid"

export default function Narrow() {
  return (
    <Card style="max-inline-size: 20rem" variant="outlined">
      <CardHeader>
        <h3 class="ui-h5">Project plan</h3>
      </CardHeader>
      <CardContent>
        <Timeline>
          <TimelineItem
            datetime="2026-09-02"
            headingLevel={4}
            label="Design freeze"
            time="Sep 2"
          />
          <TimelineItem
            datetime="2026-09-16"
            headingLevel={4}
            label="Feature complete"
            time="Sep 16"
          />
          <TimelineItem
            current="step"
            datetime="2026-10-14"
            headingLevel={4}
            label="Beta review"
            time="Oct 14"
          >
            <p>Moved from October 10.</p>
          </TimelineItem>
          <TimelineItem
            datetime="2026-10-31"
            headingLevel={4}
            label="Launch"
            time="Oct 31"
          />
        </Timeline>
      </CardContent>
    </Card>
  )
}
