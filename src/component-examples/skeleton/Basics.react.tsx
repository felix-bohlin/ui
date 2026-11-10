import { Skeleton } from "opui-css/react"

export default function Basics() {
  return (
    <div
      className="ui-layout-row"
      aria-busy="true"
      style={{ inlineSize: "20rem" }}
    >
      <Skeleton shape="circle" style={{ inlineSize: "3rem" }} />
      <div style={{ flex: "1" }}>
        <Skeleton line />
        <Skeleton line />
      </div>
    </div>
  )
}
