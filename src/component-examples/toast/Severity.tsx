import { Toast } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Toast severity="info" title="Info" description="Informational message." />
      <Toast severity="warning" title="Warning" description="Warning message." />
      <Toast severity="critical" title="Error" description="Error message." />
      <Toast severity="success" title="Success" description="Success message." />
    </>
  )
}
