import {
  Avatar,
  Message,
  Messages,
  ToggleButton,
  ToggleGroup,
} from "opui-css/react"

export default function Reactions() {
  return (
    <Messages aria-label="Messages with Saga">
      <Message
        author="Saga"
        bottom={
          <ToggleGroup
            aria-label="Reactions"
            multiple
            name="reaction"
            size="small"
          >
            <ToggleButton aria-label="Thumbs up, 2" defaultChecked value="+1">
              <span aria-hidden="true">👍 2</span>
            </ToggleButton>
            <ToggleButton aria-label="Party, 1" value="tada">
              <span aria-hidden="true">🎉 1</span>
            </ToggleButton>
          </ToggleGroup>
        }
        datetime="2026-10-08T16:05"
        start={
          <Avatar aria-label="Saga Nyström" role="img">
            SN
          </Avatar>
        }
        time="16:05"
      >
        <p>The deck is out. Thanks everyone!</p>
      </Message>
    </Messages>
  )
}
