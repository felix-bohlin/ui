import {
  Button,
  Card,
  CardActions,
  CardContent,
  Menu,
  Reactions,
} from "opui-css/react"

const firstPicker = [
  {
    "aria-label": "Thumbs up",
    command: "--react",
    commandfor: "message-quick-reaction-1",
    label: "👍",
    value: "+1",
  },
  {
    "aria-label": "Heart",
    command: "--react",
    commandfor: "message-quick-reaction-1",
    label: "❤️",
    value: "heart",
  },
  {
    "aria-label": "Laughing",
    command: "--react",
    commandfor: "message-quick-reaction-1",
    label: "😂",
    value: "joy",
  },
  {
    "aria-label": "Party",
    command: "--react",
    commandfor: "message-quick-reaction-1",
    label: "🎉",
    value: "tada",
  },
  {
    "aria-label": "Eyes",
    command: "--react",
    commandfor: "message-quick-reaction-1",
    label: "👀",
    value: "eyes",
  },
]

const secondPicker = [
  {
    "aria-label": "Thumbs up",
    command: "--react",
    commandfor: "message-quick-reaction-2",
    label: "👍",
    value: "+1",
  },
  {
    "aria-label": "Heart",
    command: "--react",
    commandfor: "message-quick-reaction-2",
    label: "❤️",
    value: "heart",
  },
  {
    "aria-label": "Laughing",
    command: "--react",
    commandfor: "message-quick-reaction-2",
    label: "😂",
    value: "joy",
  },
  {
    "aria-label": "Party",
    command: "--react",
    commandfor: "message-quick-reaction-2",
    label: "🎉",
    value: "tada",
  },
  {
    "aria-label": "Eyes",
    command: "--react",
    commandfor: "message-quick-reaction-2",
    label: "👀",
    value: "eyes",
  },
]

export default function QuickReaction() {
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          Scored a fretless four-string at the flea market. It only buzzes a
          little.
        </CardContent>
        <CardActions align="start">
          <Reactions
            aria-label="Reactions"
            id="message-quick-reaction-1"
            name="reaction"
            quick={{ "aria-label": "Thumbs up", label: "👍", value: "+1" }}
          >
            <Button
              aria-label="Add reaction"
              command="toggle-popover"
              commandfor="message-quick-reaction-1-picker"
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
              id="message-quick-reaction-1-picker"
              items={firstPicker}
              orientation="horizontal"
              side="block-start"
            />
          </Reactions>
        </CardActions>
      </Card>

      <Card variant="outlined">
        <CardContent>
          Band practice moved to Thursday. Bring your own patch cables.
        </CardContent>
        <CardActions align="start">
          <Reactions
            aria-label="Reactions"
            id="message-quick-reaction-2"
            items={[
              { "aria-label": "Party, 1", label: "🎉 1", value: "tada" },
              {
                "aria-label": "Thumbs up, 3",
                checked: true,
                label: "👍 3",
                value: "+1",
              },
            ]}
            name="reaction"
            quick={{ "aria-label": "Thumbs up", label: "👍", value: "+1" }}
          >
            <Button
              aria-label="Add reaction"
              command="toggle-popover"
              commandfor="message-quick-reaction-2-picker"
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
              id="message-quick-reaction-2-picker"
              items={secondPicker}
              orientation="horizontal"
              side="block-start"
            />
          </Reactions>
        </CardActions>
      </Card>
    </>
  )
}
