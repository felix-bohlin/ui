import {
  Anchor,
  AnchorContent,
  Button,
  Card,
  CardContent,
} from "opui-css/react"

export default function AlwaysVisible() {
  return (
    <>
      <Anchor positionArea="inline-end">
        <Button variant="outlined">Export</Button>
        <AnchorContent>
          <Card variant="tonal" className="coach-mark">
            <CardContent>
              <strong>New</strong> Export to PDF and CSV from the same menu.
            </CardContent>
          </Card>
        </AnchorContent>
      </Anchor>
      <style>{`
        .coach-mark {
          font-size: var(--font-size-1);
          margin-inline-start: var(--size-2);
          max-inline-size: 220px;
        }
      `}</style>
    </>
  )
}
