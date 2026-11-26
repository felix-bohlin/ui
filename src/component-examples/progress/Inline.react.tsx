import { Progress } from "opui-css/react"

export default function Inline() {
  return (
    <div>
      Uploading 3 of 8 files{" "}
      <Progress
        aria-label="Uploading"
        max="8"
        style={{ inlineSize: "12rem" }}
        value="3"
      />
    </div>
  )
}
