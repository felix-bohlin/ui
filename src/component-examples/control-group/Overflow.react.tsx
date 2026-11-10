import { Button, ControlGroup } from "opui-css/react"

export default function Overflow() {
  return (
    <div className="ui-layout-column ui-large">
      <ControlGroup
        aria-label="Message actions"
        style={{ maxInlineSize: "18rem" }}
        variant="outlined"
      >
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ControlGroup>
      <ControlGroup
        aria-label="Message actions"
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
        aria-label="Message actions"
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
