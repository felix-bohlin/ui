import { Avatar, Message, Messages } from "opui-css/react"

export default function GroupChat() {
  return (
    <Messages label="Messages in #design">
      <Message
        author="Leila"
        avatar={
          <Avatar aria-label="Leila Haddad" role="img">
            LH
          </Avatar>
        }
        datetime="2026-10-08T09:12"
        time="09:12"
      >
        <p>The new icons are ready.</p>
      </Message>
      <Message
        author="Leila"
        avatar={
          <Avatar aria-label="Leila Haddad" role="img">
            LH
          </Avatar>
        }
        datetime="2026-10-08T09:13"
        time="09:13"
      >
        <p>Can we review them today?</p>
      </Message>
      <Message
        author="Omar"
        avatar={
          <Avatar aria-label="Omar Saleh" role="img">
            OS
          </Avatar>
        }
        datetime="2026-10-08T09:15"
        newAuthor
        time="09:15"
      >
        <p>I'm free after lunch.</p>
      </Message>
      <Message
        author="Omar"
        avatar={
          <Avatar aria-label="Omar Saleh" role="img">
            OS
          </Avatar>
        }
        datetime="2026-10-08T09:16"
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
