import { Chip } from "opui-css/react"

export default function Accent() {
  return (
    <>
      <Chip color="accent" label="Bassbook Gold" />
      <Chip
        className="ui-scope"
        color="accent"
        label="Funk"
        style={{ "--ui-palette-hue": "300" }}
      />
      <Chip
        className="ui-scope"
        color="accent"
        label="Fretless"
        style={{ "--ui-palette-hue": "190" }}
      />
      <Chip
        className="ui-scope"
        color="accent"
        label="Slap"
        style={{ "--ui-palette-hue": "45" }}
      />
    </>
  )
}
