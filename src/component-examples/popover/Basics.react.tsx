import {
  Button,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
} from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="popover-basics-1"
        variant="outlined"
      >
        Notifications
      </Button>
      <Popover closeOnNavigate id="popover-basics-1">
        <PopoverHeader closeLabel="Close">
          <PopoverTitle>Notifications</PopoverTitle>
        </PopoverHeader>
        <PopoverContent>
          <p>Maja commented on your photo from the summer trip.</p>
          <p>Jonas wrote on your wall.</p>
        </PopoverContent>
        <PopoverFooter>
          <Button href="/guide/getting-started/">See all</Button>
        </PopoverFooter>
      </Popover>
    </>
  )
}
