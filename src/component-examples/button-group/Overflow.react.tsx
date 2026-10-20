import { Button, ButtonGroup } from "opui-css/react"

export default function Overflow() {
  return (
    <>
      <ButtonGroup variant="outlined" style={{ maxInlineSize: "18rem" }}>
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ButtonGroup>
      <ButtonGroup
        variant="outlined"
        scrollable
        style={{ maxInlineSize: "18rem" }}
      >
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" shrink style={{ maxInlineSize: "18rem" }}>
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ButtonGroup>
    </>
  )
}
