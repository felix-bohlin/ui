import { List } from "opui-css/react"
import ListAll from "./partials/ListAll.react"

export default function Default() {
  return (
    <List>
      <ListAll prefix="default-" />
    </List>
  )
}
