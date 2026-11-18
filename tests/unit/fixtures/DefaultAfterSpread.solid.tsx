/** @jsxImportSource @solidjs/web */
export default function DefaultAfterSpread(props: { rest: object }) {
  return (
    <>
      <input data-order="before" defaultValue="x" {...props.rest} />
      <input data-order="after" {...props.rest} defaultValue="x" />
    </>
  )
}
