/** @jsxImportSource @solidjs/web */
import { Chip } from "opui-css/solid"

export default function Accent() {
  return (
    <>
      <Chip color="accent" label="Bassbook Gold" />
      <Chip
        class="ui-scope"
        color="accent"
        label="Funk"
        style="--ui-palette-hue: 300"
      />
      <Chip
        class="ui-scope"
        color="accent"
        label="Fretless"
        style="--ui-palette-hue: 190"
      />
      <Chip
        class="ui-scope"
        color="accent"
        label="Slap"
        style="--ui-palette-hue: 45"
      />
    </>
  )
}
