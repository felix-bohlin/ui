import { Anchor, Button, Card } from "opui-css/solid"

export default function Example() {
  return (
    <Anchor
      alignment="inline-end"
      anchored={
        <Card
          variant="tonal"
          class="coach-mark"
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
  )
}
