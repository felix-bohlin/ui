import { Avatar, Message, Messages } from "opui-css/react"

export default function Typing() {
  return (
    <Messages aria-label="Messages with Saga">
      <Message
        author="Saga"
        start={
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
        start={
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
