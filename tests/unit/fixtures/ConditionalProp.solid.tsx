/** @jsxImportSource @solidjs/web */
const Reader = (props: { reads: number; value?: string }) => {
  const values = Array.from({ length: props.reads }, () => props.value)

  return <i>{values.length}</i>
}

export default function ConditionalProp(props: {
  fallback?: string
  on?: boolean
  reads: number
}) {
  return (
    <>
      <Reader reads={props.reads} value={props.on ? "a" : props.fallback} />
      <b />
    </>
  )
}
