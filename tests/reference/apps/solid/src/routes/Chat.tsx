import { useSearchParams } from "@solidjs/router"
import {
  Button,
  List,
  ListItem,
  Message,
  MessageList,
  Textarea,
} from "opui-css/solid"
import {
  ME,
  conversation,
  conversations,
  outgoing,
  user,
  type ChatLine,
} from "reference-shared"
import { createMemo, createSignal, For } from "solid-js"
import UserAvatar from "../lib/UserAvatar"
import { useSent } from "../lib/chat"
import { useTitle } from "../lib/title"

export default function Chat() {
  useTitle(() => "Chat")
  const [search] = useSearchParams<{ with: string }>()
  const [sent, setSent] = useSent()
  const all = conversations()
  const open = createMemo(() => conversation(search.with))
  const lines = createMemo<ChatLine[]>(() => [
    ...open().lines,
    ...(sent[open().with] ?? []),
  ])
  const [text, setText] = createSignal("")

  const send = (event: SubmitEvent) => {
    event.preventDefault()
    const handle = open().with
    const message = text()
    setSent((draft) => {
      const mine = draft[handle] ?? []
      draft[handle] = [...mine, outgoing(message, mine.length)]
    })
    setText("")
  }

  return (
    <div class="app-screen" data-screen="chat">
      <h1>Chat</h1>
      <div class="app-chat">
        <nav aria-label="Conversations">
          <List variant="transparent">
            <For each={all}>
              {(item) => (
                <ListItem
                  aria-current={item.with === open().with ? "page" : undefined}
                  description={
                    item.unread ? `${item.unread} unread` : undefined
                  }
                  href={`/chat?with=${item.with}`}
                  label={item.user.name}
                  start={<UserAvatar size="small" user={item.user} />}
                />
              )}
            </For>
          </List>
        </nav>
        <section aria-labelledby="chat-title" class="app-screen">
          <h2 id="chat-title">{open().user.name}</h2>
          <MessageList aria-label={`Messages with ${open().user.name}`} direct>
            <For each={lines()}>
              {(line) => {
                if (line.kind === "divider")
                  return <li class="ui-divider">{line.label}</li>
                const from = user(line.from)!
                return (
                  <Message
                    author={from.name}
                    datetime={line.datetime}
                    outgoing={line.from === ME}
                    start={
                      line.from === ME ? undefined : (
                        <UserAvatar size="small" user={from} />
                      )
                    }
                    time={line.time}
                  >
                    <p>{line.text}</p>
                  </Message>
                )
              }}
            </For>
          </MessageList>
          <form
            aria-label="Send a message"
            class="ui-layout-column"
            onSubmit={send}
          >
            <Textarea
              hideLabel
              label="Message"
              name="text"
              onInput={(event) => setText(event.currentTarget.value)}
              required
              value={text()}
            />
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
