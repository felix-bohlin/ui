import { List } from "opui-css/solid"
import ListAll from "./ListAll.tsx"

export default function ListDense() {
  return (
    <List dense class="list-dense-target">
      <ListAll prefix="dense-" />
    </List>
  )
}
