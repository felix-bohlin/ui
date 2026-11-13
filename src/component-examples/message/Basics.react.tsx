import { Avatar, Message, MessageList } from "opui-css/react"

export default function Basics() {
  return (
    <div aria-label="Chat with Sirkka" role="log">
      <MessageList aria-label="Messages with Sirkka">
        <Message
          author="Sirkka"
          datetime="2026-10-08T14:02"
          start={
            <Avatar aria-label="Sirkka Nitti" role="img">
              SN
            </Avatar>
          }
          time="14:02"
        >
          <p>Did you get a chance to look at the pricing proposal?</p>
        </Message>
        <Message
          author="Sirkka"
          datetime="2026-10-08T14:03"
          start={
            <Avatar aria-label="Sirkka Nitti" role="img">
              SN
            </Avatar>
          }
          time="14:03"
        >
          <p>No rush, Friday is fine.</p>
        </Message>
        <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
          <p>Yes, looks good. I'd lead with the annual plan.</p>
        </Message>
        <Message
          author="You"
          datetime="2026-10-08T14:19"
          end="Read"
          outgoing
          time="14:19"
        >
          <p>Can you add the Bergen Bikes case study too?</p>
        </Message>
      </MessageList>
    </div>
  )
}
