import { Avatar, Message, Messages } from "opui-css/react"

export default function Typing() {
  return (
    <Messages label="Messages with Saga">
      <Message
        author="Saga"
        avatar={
          <Avatar aria-label="Saga Nyström" role="img">
            SN
          </Avatar>
        }
        datetime="2026-10-08T14:32"
        time="14:32"
      >
        <p>Let me check with the team.</p>
      </Message>
      <Message
        avatar={
          <Avatar aria-label="Saga Nyström" role="img">
            SN
          </Avatar>
        }
        typing
      >
        Saga is typing…
      </Message>
    </Messages>
  )
}
