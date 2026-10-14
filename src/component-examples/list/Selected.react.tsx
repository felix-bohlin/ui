import { List, ListItem } from "opui-css/react"

export default function Selected() {
  return (
    <List>
      <ListItem>
        <a href="#" aria-current="page">
          <div className="ui-text">
            <p>Selected item</p>
            <p>This item has aria-current="page" on its link</p>
          </div>
        </a>
      </ListItem>
      <ListItem>
        <a href="#">
          <div className="ui-text">
            <p>Normal item</p>
          </div>
        </a>
      </ListItem>
    </List>
  )
}
