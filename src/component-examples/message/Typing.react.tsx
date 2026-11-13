import { Avatar, Message, MessageList } from "opui-css/react"

export default function Typing() {
  return (
    <MessageList aria-label="Messages with Sirkka">
      <Message
        author="Sirkka"
        datetime="2026-10-08T14:32"
        start={<Avatar aria-hidden="true">SN</Avatar>}
        time="14:32"
      >
        <p>Let me check with the team.</p>
      </Message>
      <Message start={<Avatar aria-hidden="true">SN</Avatar>} typing>
        Sirkka is typing…
      </Message>
    </MessageList>
  )
}
