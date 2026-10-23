import { Range } from "opui-css/react"

export default function Surfaces() {
  return (
    <>
      <Range>
        <code>outlined</code> (default) ={" "}
        <code>var(--ui-field-border-color)</code>
      </Range>
      <Range variant="filled">
        <code>filled</code> = <code>var(--ui-surface-filled)</code>
      </Range>
      <Range variant="tonal">
        <code>tonal</code> = <code>var(--ui-surface-tonal)</code>
      </Range>
    </>
  )
}
