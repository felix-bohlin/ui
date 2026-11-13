import { Avatar, Message, MessageList } from "opui-css/react"

export default function GroupChat() {
  return (
    <MessageList aria-label="Messages in #design">
      <li className="ui-divider">Today</li>
      <Message
        author="Lena"
        datetime="2026-10-08T09:12"
        start={<Avatar aria-hidden="true">LH</Avatar>}
        time="09:12"
      >
        <p>The new icons are ready.</p>
      </Message>
      <Message
        author="Lena"
        datetime="2026-10-08T09:13"
        start={<Avatar aria-hidden="true">LH</Avatar>}
        time="09:13"
      >
        <p>Can we review them today?</p>
      </Message>
      <Message
        author="Hakki"
        datetime="2026-10-08T09:15"
        newAuthor
        start={<Avatar aria-hidden="true">HH</Avatar>}
        time="09:15"
      >
        <p>I'm free after lunch.</p>
      </Message>
      <Message
        author="Hakki"
        datetime="2026-10-08T09:16"
        start={<Avatar aria-hidden="true">HH</Avatar>}
        time="09:16"
      >
        <p>I'll book a room.</p>
      </Message>
      <li className="ui-divider">Hakki added you</li>
      <Message author="You" datetime="2026-10-08T09:20" outgoing time="09:20">
        <p>See you at one.</p>
      </Message>
    </MessageList>
  )
}
