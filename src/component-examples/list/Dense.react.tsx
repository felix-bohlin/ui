import { List } from "opui-css/react"
import ListAll from "./partials/ListAll.react"

export default function Dense() {
  return (
    <List dense>
      <ListAll prefix="dense-" />
    </List>
  )
}
