import { Range } from "opui-css/react"

export default function Surfaces() {
  return (
    <>
      <Range
        label={
          <>
            <code>outlined</code> (default) ={" "}
            <code>var(--ui-field-border-color)</code>
          </>
        }
      />
      <Range
        label={
          <>
            <code>filled</code> = <code>var(--ui-surface-filled)</code>
          </>
        }
        variant="filled"
      />
      <Range
        label={
          <>
            <code>tonal</code> = <code>var(--ui-surface-tonal)</code>
          </>
        }
        variant="tonal"
      />
    </>
  )
}
