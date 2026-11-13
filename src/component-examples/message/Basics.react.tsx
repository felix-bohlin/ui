import { Avatar, Message, MessageList } from "opui-css/react"

export default function Basics() {
  return (
    <div aria-label="Chat with Stella" role="log">
      <MessageList aria-label="Messages with Stella">
        <Message
          author="Stella"
          datetime="2026-10-08T14:02"
          start={<Avatar>SN</Avatar>}
          time="14:02"
        >
          <p>Heyyy! Did your band notice you changed strings yet?</p>
        </Message>
        <Message
          author="Stella"
          datetime="2026-10-08T14:03"
          start={<Avatar>SN</Avatar>}
          time="14:03"
        >
          <p>Flatwounds, right? So rad.</p>
        </Message>
        <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
          <p>Nope, not even the drummer. Bummer, but WE know.</p>
        </Message>
        <Message
          author="You"
          datetime="2026-10-08T14:19"
          end="Read"
          outgoing
          time="14:19"
        >
          <p>Can you send me the tab for your slap break?</p>
        </Message>
      </MessageList>
    </div>
  )
}
