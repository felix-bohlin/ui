import { Divider } from "opui-css/react"

export default function Variants() {
  return (
    <>
      Filled <Divider variant="filled" /> Primary <Divider color="primary" />{" "}
      Tonal <Divider variant="tonal" />
    </>
  )
}
