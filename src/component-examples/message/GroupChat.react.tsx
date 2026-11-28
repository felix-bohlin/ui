import { Avatar, Message, MessageList } from "opui-css/react"

export default function GroupChat() {
  return (
    <MessageList aria-label="Messages in Bassists Anonymous">
      <li className="ui-divider">Today</li>
      <Message
        author="Kinga"
        datetime="2026-10-08T09:12"
        start={<Avatar>KH</Avatar>}
        time="09:12"
      >
        <p>My new pedalboard is ready.</p>
      </Message>
      <Message
        author="Kinga"
        datetime="2026-10-08T09:13"
        start={<Avatar>KH</Avatar>}
        time="09:13"
      >
        <p>Can we jam with it today?</p>
      </Message>
      <Message
        author="Scott"
        datetime="2026-10-08T09:15"
        newAuthor
        start={<Avatar>SH</Avatar>}
        time="09:15"
      >
        <p>I'm free after lunch :)</p>
      </Message>
      <Message
        author="Scott"
        datetime="2026-10-08T09:16"
        start={<Avatar>SH</Avatar>}
        time="09:16"
      >
        <p>I'll book the rehearsal room.</p>
      </Message>
      <li className="ui-divider">Scott added you</li>
      <Message author="You" datetime="2026-10-08T09:20" outgoing time="09:20">
        <p>See you at one, bring snacks.</p>
      </Message>
    </MessageList>
  )
}
