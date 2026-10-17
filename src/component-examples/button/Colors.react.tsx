import { Button } from "opui-css/react"

export default function Colors() {
  return (
    <>
      <div className="example-row">
        <Button color="primary">Primary</Button>
        <Button color="primary" variant="outlined">
          Outlined
        </Button>
        <Button color="primary" variant="tonal">
          Tonal
        </Button>
        <Button color="primary" variant="filled">
          Filled
        </Button>
      </div>
      <div className="example-row">
        <Button color="critical">Critical</Button>
        <Button color="critical" variant="outlined">
          Outlined
        </Button>
        <Button color="critical" variant="tonal">
          Tonal
        </Button>
        <Button color="critical" variant="filled">
          Filled
        </Button>
      </div>
    </>
  )
}
