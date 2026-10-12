import { Anchor, Button, Card } from "opui-css/react"

export default function AlwaysVisible() {
  return (
    <>
      <Anchor
        alignment="inline-end"
        anchored={
          <Card
            variant="tonal"
            className="coach-mark"
            content={
              <>
                <strong>New</strong> Export to PDF and CSV from the same menu.
              </>
            }
          />
        }
      >
        <Button variant="outlined">Export</Button>
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
