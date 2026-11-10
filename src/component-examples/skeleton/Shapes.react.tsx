import { Skeleton } from "opui-css/react"

export default function Shapes() {
  return (
    <div className="ui-layout-row">
      <Skeleton shape="circle" style={{ inlineSize: "4rem" }} />
      <Skeleton style={{ blockSize: "4rem", inlineSize: "6rem" }} />
      <Skeleton
        shape="squared"
        style={{ blockSize: "4rem", inlineSize: "6rem" }}
      />
    </div>
  )
}
