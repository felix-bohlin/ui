import { Avatar, Message, MessageList } from "opui-css/react"

export default function Typing() {
  return (
    <MessageList aria-label="Messages with Stella">
      <Message
        author="Stella"
        datetime="2026-10-08T14:32"
        start={<Avatar>SN</Avatar>}
        time="14:32"
      >
        <p>Let me ask if the band even noticed.</p>
      </Message>
      <Message start={<Avatar>SN</Avatar>} typing>
        Stella is typing…
      </Message>
    </MessageList>
  )
}
