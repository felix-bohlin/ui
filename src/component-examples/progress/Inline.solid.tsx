/** @jsxImportSource @solidjs/web */
import { Progress } from "opui-css/solid"

export default function Inline() {
  return (
    <div>
      Uploading 3 of 8 files{" "}
      <Progress
        aria-label="Uploading"
        max="8"
        style="inline-size: 12rem"
        value="3"
      />
    </div>
  )
}
