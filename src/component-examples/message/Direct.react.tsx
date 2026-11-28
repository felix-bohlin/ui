import { Avatar, Message, MessageList } from "opui-css/react"

export default function Direct() {
  return (
    <div aria-label="Chat with Ellen" role="log">
      <MessageList aria-label="Messages with Ellen" direct>
        <Message
          author="Ellen"
          datetime="2026-10-08T14:02"
          start={<Avatar>EN</Avatar>}
          time="14:02"
        >
          <p>Heyyy! Did your band notice you changed strings yet?</p>
        </Message>
        <Message
          author="Ellen"
          datetime="2026-10-08T14:03"
          start={<Avatar>EN</Avatar>}
          time="14:03"
        >
          <p>Flatwounds, right? So rad.</p>
        </Message>
        <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
          <p>Nope, not even the drummer. Bummer, but WE know.</p>
        </Message>
        <Message
          author="Ellen"
          datetime="2026-10-08T14:21"
          start={<Avatar>EN</Avatar>}
          time="14:21"
        >
          <p>Their loss. Tab's in your inbox!</p>
        </Message>
      </MessageList>
    </div>
  )
}
