/** @jsxImportSource @solidjs/web */
import {
  Avatar,
  Button,
  Menu,
  Message,
  MessageList,
  Reactions,
} from "opui-css/solid"

const firstPicker = [
  {
    "aria-label": "Thumbs up",
    command: "--react",
    commandfor: "message-reactions-1",
    label: "👍",
    value: "+1",
  },
  {
    "aria-label": "Heart",
    command: "--react",
    commandfor: "message-reactions-1",
    label: "❤️",
    value: "heart",
  },
  {
    "aria-label": "Laughing",
    command: "--react",
    commandfor: "message-reactions-1",
    label: "😂",
    value: "joy",
  },
  {
    "aria-label": "Party",
    command: "--react",
    commandfor: "message-reactions-1",
    label: "🎉",
    value: "tada",
  },
  {
    "aria-label": "Eyes",
    command: "--react",
    commandfor: "message-reactions-1",
    label: "👀",
    value: "eyes",
  },
]

const secondPicker = [
  {
    "aria-label": "Thumbs up",
    command: "--react",
    commandfor: "message-reactions-2",
    label: "👍",
    value: "+1",
  },
  {
    "aria-label": "Heart",
    command: "--react",
    commandfor: "message-reactions-2",
    label: "❤️",
    value: "heart",
  },
  {
    "aria-label": "Laughing",
    command: "--react",
    commandfor: "message-reactions-2",
    label: "😂",
    value: "joy",
  },
  {
    "aria-label": "Party",
    command: "--react",
    commandfor: "message-reactions-2",
    label: "🎉",
    value: "tada",
  },
  {
    "aria-label": "Eyes",
    command: "--react",
    commandfor: "message-reactions-2",
    label: "👀",
    value: "eyes",
  },
]

export default function ReactionsExample() {
  return (
    <MessageList aria-label="Messages with Ellen">
      <Message
        actions={
          <>
            <Button
              aria-label="Add reaction"
              command="toggle-popover"
              commandfor="message-reactions-1-picker"
              round
              size="x-small"
            >
              <svg
                data-icon="add"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
                ></path>
              </svg>
            </Button>
            <Menu
              aria-label="Add reaction"
              id="message-reactions-1-picker"
              items={firstPicker}
              orientation="horizontal"
              side="block-start"
            />
          </>
        }
        author="Ellen"
        bottom={
          <Reactions
            aria-label="Reactions"
            id="message-reactions-1"
            items={[
              {
                "aria-label": "Thumbs up, 2",
                checked: true,
                label: "👍 2",
                value: "+1",
              },
              { "aria-label": "Party, 1", label: "🎉 1", value: "tada" },
            ]}
            name="reaction"
          />
        }
        datetime="2026-10-08T16:05"
        start={<Avatar>EN</Avatar>}
        time="16:05"
      >
        <p>My slap cover is up. Thanks for listening, everyone!</p>
      </Message>
      <Message
        actions={
          <>
            <Button
              aria-label="Add reaction"
              command="toggle-popover"
              commandfor="message-reactions-2-picker"
              round
              size="x-small"
            >
              <svg
                data-icon="add"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
                ></path>
              </svg>
            </Button>
            <Menu
              align="end"
              aria-label="Add reaction"
              id="message-reactions-2-picker"
              items={secondPicker}
              orientation="horizontal"
              side="block-start"
            />
          </>
        }
        author="You"
        bottom={
          <Reactions
            aria-label="Reactions"
            id="message-reactions-2"
            items={[
              { "aria-label": "Heart, 1", label: "❤️ 1", value: "heart" },
            ]}
            name="reaction"
          />
        }
        datetime="2026-10-08T16:07"
        outgoing
        time="16:07"
      >
        <p>Totally rad, that low B rattled my windows.</p>
      </Message>
    </MessageList>
  )
}
