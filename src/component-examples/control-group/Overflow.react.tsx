import { Button, ControlGroup } from "opui-css/react"

export default function Overflow() {
  return (
    <div className="ui-layout-column ui-large">
      <ControlGroup style={{ maxInlineSize: "18rem" }} variant="outlined">
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ControlGroup>
      <ControlGroup
        overflow="scroll"
        style={{ maxInlineSize: "18rem" }}
        variant="outlined"
      >
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ControlGroup>
      <ControlGroup
        overflow="shrink"
        style={{ maxInlineSize: "18rem" }}
        variant="outlined"
      >
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ControlGroup>
    </div>
  )
}
