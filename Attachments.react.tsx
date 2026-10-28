import { Avatar, Card, CardContent, Message, Messages } from "opui-css/react"

const icon = (
  <svg
    aria-hidden="true"
    class="ui-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
    ></path>
  </svg>
)

export default function Attachments() {
  return (
    <Messages aria-label="Messages with Saga">
      <Message
        author="Saga"
        datetime="2026-10-08T14:31"
        start={
          <Avatar aria-label="Saga Nyström" role="img">
            SN
          </Avatar>
        }
        time="14:31"
      >
        <p>Here's the current draft:</p>
        <Card variant="outlined">
          <CardContent className="ui-layout-media ui-small">
            {icon}
            <div>
              <a className="ui-link" href="#message-attachments-1">
                Pricing-proposal.pdf
              </a>
              <p className="ui-caption">PDF, 2.4 MB</p>
            </div>
          </CardContent>
        </Card>
      </Message>
      <Message author="You" datetime="2026-10-08T14:40" outgoing time="14:40">
        <p>Thanks! Here's the signed contract.</p>
        <Card variant="outlined">
          <CardContent className="ui-layout-media ui-small">
            {icon}
            <div>
              <a className="ui-link" href="#message-attachments-2">
                Contract-signed.pdf
              </a>
              <p className="ui-caption">PDF, 860 kB</p>
            </div>
          </CardContent>
        </Card>
      </Message>
    </Messages>
  )
}
