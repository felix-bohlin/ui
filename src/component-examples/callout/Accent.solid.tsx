/** @jsxImportSource @solidjs/web */
import { Callout, CalloutContent } from "opui-css/solid"

export default function Accent() {
  return (
    <>
      <Callout color="accent">
        <CalloutContent>
          Bassbook Gold members get early access to lessons.
        </CalloutContent>
      </Callout>
      <Callout class="ui-scope" color="accent" style="--ui-palette-hue: 300">
        <CalloutContent>Funk night starts Friday at 8 pm.</CalloutContent>
      </Callout>
    </>
  )
}
