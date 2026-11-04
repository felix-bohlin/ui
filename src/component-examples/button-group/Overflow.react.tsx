import { Button, ButtonGroup } from "opui-css/react"

export default function Overflow() {
  return (
    <>
      <ButtonGroup style={{ maxInlineSize: "18rem" }} variant="outlined">
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ButtonGroup>
      <ButtonGroup
        overflow="scroll"
        style={{ maxInlineSize: "18rem" }}
        variant="outlined"
      >
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ButtonGroup>
      <ButtonGroup
        overflow="shrink"
        style={{ maxInlineSize: "18rem" }}
        variant="outlined"
      >
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ButtonGroup>
    </>
  )
}
