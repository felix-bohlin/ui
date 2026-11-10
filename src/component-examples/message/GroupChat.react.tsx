import { Avatar, Message, Messages } from "opui-css/react"

export default function GroupChat() {
  return (
    <Messages aria-label="Messages in #design">
      <li className="ui-divider">Today</li>
      <Message
        author="Leila"
        datetime="2026-10-08T09:12"
        start={
          <Avatar aria-label="Leila Haddad" role="img">
            LH
          </Avatar>
        }
        time="09:12"
      >
        <p>The new icons are ready.</p>
      </Message>
      <Message
        author="Leila"
        datetime="2026-10-08T09:13"
        start={
          <Avatar aria-label="Leila Haddad" role="img">
            LH
          </Avatar>
        }
        time="09:13"
      >
        <p>Can we review them today?</p>
      </Message>
      <Message
        author="Omar"
        datetime="2026-10-08T09:15"
        newAuthor
        start={
          <Avatar aria-label="Omar Saleh" role="img">
            OS
          </Avatar>
        }
        time="09:15"
      >
        <p>I'm free after lunch.</p>
      </Message>
      <Message
        author="Omar"
        datetime="2026-10-08T09:16"
        start={
          <Avatar aria-label="Omar Saleh" role="img">
            OS
          </Avatar>
        }
        time="09:16"
      >
        <p>I'll book a room.</p>
      </Message>
      <Message author="You" datetime="2026-10-08T09:20" outgoing time="09:20">
        <p>See you at one.</p>
      </Message>
    </Messages>
  )
}
