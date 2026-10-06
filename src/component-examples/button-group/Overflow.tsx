import { Button, ButtonGroup } from "opui-css/solid"

export default function Example() {
  return (
    <div style="display: grid; gap: var(--size-3); max-inline-size: 18rem">
      <ButtonGroup variant="outlined">
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" scrollable>
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" shrink>
        <Button>Archive</Button>
        <Button>Move to folder</Button>
        <Button>Mark as unread</Button>
        <Button>Delete</Button>
      </ButtonGroup>
    </div>
  )
}
