import { Avatar, Message, Messages } from "opui-css/react"

export default function Attachments() {
  return (
    <Messages label="Messages with Saga">
      <Message
        author="Saga"
        avatar={
          <Avatar aria-label="Saga Nyström" role="img">
            SN
          </Avatar>
        }
        datetime="2026-10-08T14:31"
        time="14:31"
      >
        <p>Here's the current draft:</p>
        <div className="ui-attachment">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
            ></path>
          </svg>
          <div>
            <a className="ui-link" href="#pricing-proposal">
              Pricing-proposal.pdf
            </a>
            <p>PDF · 2.4 MB</p>
          </div>
        </div>
      </Message>
      <Message author="You" datetime="2026-10-08T14:40" outgoing time="14:40">
        <p>Thanks! Here's the signed contract.</p>
        <div className="ui-attachment">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
            ></path>
          </svg>
          <div>
            <a className="ui-link" href="#signed-contract">
              Contract-signed.pdf
            </a>
            <p>PDF · 860 kB</p>
          </div>
        </div>
      </Message>
    </Messages>
  )
}
