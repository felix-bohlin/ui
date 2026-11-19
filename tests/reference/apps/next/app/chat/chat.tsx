"use client"

import {
  Button,
  List,
  ListItem,
  Message,
  MessageList,
  Textarea,
} from "opui-css/react"
import {
  ME,
  conversation,
  conversations,
  outgoing,
  user,
} from "reference-shared"
import { useSent } from "@/lib/chat-store"
import UserAvatar from "@/lib/user-avatar"

const all = conversations()

export default function Chat({ handle }: { handle: string | null }) {
  const [sent, setSent] = useSent()
  const open = conversation(handle)
  const mine = sent[open.with] ?? []
  const lines = [...open.lines, ...mine]

  const send = (form: FormData) =>
    setSent({
      ...sent,
      [open.with]: [...mine, outgoing(String(form.get("text")), mine.length)],
    })

  return (
    <div className="app-screen" data-screen="chat">
      <h1>Chat</h1>
      <div className="app-chat">
        <nav aria-label="Conversations">
          <List variant="transparent">
            {all.map((item) => (
              <ListItem
                aria-current={item.with === open.with ? "page" : undefined}
                description={item.unread ? `${item.unread} unread` : undefined}
                href={`/chat?with=${item.with}`}
                key={item.with}
                label={item.user.name}
                start={<UserAvatar size="small" user={item.user} />}
              />
            ))}
          </List>
        </nav>
        <section aria-labelledby="chat-title" className="app-screen">
          <h2 id="chat-title">{open.user.name}</h2>
          <MessageList aria-label={`Messages with ${open.user.name}`} direct>
            {lines.map((line, index) => {
              if (line.kind === "divider") {
                return (
                  <li className="ui-divider" key={index}>
                    {line.label}
                  </li>
                )
              }
              const author = user(line.from)!
              return (
                <Message
                  author={author.name}
                  datetime={line.datetime}
                  key={index}
                  outgoing={line.from === ME}
                  start={
                    line.from !== ME && (
                      <UserAvatar size="small" user={author} />
                    )
                  }
                  time={line.time}
                >
                  <p>{line.text}</p>
                </Message>
              )
            })}
          </MessageList>
          <form
            action={send}
            aria-label="Send a message"
            className="ui-layout-column"
          >
            <Textarea hideLabel label="Message" name="text" required />
            <div>
              <Button type="submit" variant="filled">
                Send
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
