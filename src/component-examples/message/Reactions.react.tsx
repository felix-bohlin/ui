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
          <ToggleGroup aria-label="Reactions" multiple name="reaction">
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
      <Message
        author="You"
        bottom={
          <ToggleGroup aria-label="Reactions" multiple name="reaction">
            <ToggleButton aria-label="Heart, 1" value="heart">
              <span aria-hidden="true">❤️ 1</span>
            </ToggleButton>
          </ToggleGroup>
        }
        datetime="2026-10-08T16:07"
        outgoing
        time="16:07"
      >
        <p>Great work, it looks sharp.</p>
      </Message>
    </Messages>
  )
}
