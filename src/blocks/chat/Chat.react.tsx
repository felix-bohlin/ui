import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  FieldGroup,
  List,
  ListItem,
  Menu,
  Message,
  MessageList,
  Textarea,
  TextField,
} from "opui-css/react"

export default function Chat() {
  return (
    <>
      <div className="chat">
        <div
          className="ui-layout-columns"
          style={{ "--_columns": "20rem 1fr", "--_gap": "0" }}
        >
          <aside
            aria-labelledby="chat-conversations-heading"
            className="chat-sidebar"
          >
            <div className="ui-layout-column chat-sidebar-header">
              <div className="ui-layout-row ui-spread">
                <h2 className="ui-h5" id="chat-conversations-heading">
                  Messages
                </h2>
                <Button
                  aria-label="New message"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
                    ></path>
                  </svg>
                </Button>
              </div>
              <TextField
                aria-label="Search messages"
                id="chat-search"
                name="chat-search"
                placeholder="Search"
                size="small"
                start={
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
                    ></path>
                  </svg>
                }
                type="search"
              />
            </div>
            <List variant="transparent">
              <ListItem
                aria-current="page"
                description="Nobody will hear it, but WE will know"
                end="14:32"
                href="#chat-stella"
                label="Stella Nut"
                start={
                  <Avatar aria-label="Stella Nut" role="img">
                    SN
                  </Avatar>
                }
              />
              <ListItem
                description="Holly: Rate my new 5-string!! 😍"
                end={
                  <span className="chat-unread">
                    3 <span className="ui-sr-only">unread</span>
                  </span>
                }
                href="#chat-low-end-theory"
                label={<strong>Low End Theory</strong>}
                start={
                  <Avatar aria-label="Low End Theory" role="img">
                    LE
                  </Avatar>
                }
              />
              <ListItem
                description="Is it normal that my band booked a gig without me?"
                end="11:05"
                href="#chat-percy"
                label="Percy Groove"
                start={
                  <Avatar aria-label="Percy Groove" role="img">
                    PG
                  </Avatar>
                }
              />
              <ListItem
                description="You: Pick or fingers? Fight me :P"
                end="Mon"
                href="#chat-ines"
                label="Ines Hertz"
                start={
                  <Avatar aria-label="Ines Hertz" role="img">
                    IH
                  </Avatar>
                }
              />
              <ListItem
                description='Lou: My singer called me "the tall guitarist" again'
                end="Sun"
                href="#chat-ignored-bassists"
                label="Ignored Bassists Anonymous"
                start={
                  <Avatar aria-label="Ignored Bassists Anonymous" role="img">
                    IB
                  </Avatar>
                }
              />
            </List>
          </aside>
          <main>
            <header className="ui-layout-row chat-thread-header">
              <Button
                aria-label="Show conversations"
                className="chat-conversations-button"
                command="show-modal"
                commandfor="chat-drawer"
                round
                size="small"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"
                  ></path>
                </svg>
              </Button>
              <Avatar aria-label="Stella Nut" role="img">
                SN
              </Avatar>
              <hgroup>
                <h1 className="ui-h6">Stella Nut</h1>
                <p>
                  <Chip
                    as="span"
                    dot
                    label="Online"
                    severity="success"
                    size="small"
                  />
                </p>
              </hgroup>
              <div className="ui-layout-row ui-x-small">
                <Button
                  aria-label="Start call"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1A17 17 0 0 1 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"
                    ></path>
                  </svg>
                </Button>
                <Button
                  aria-label="Conversation options"
                  command="toggle-popover"
                  commandfor="chat-options"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                    ></path>
                  </svg>
                </Button>
                <Menu
                  align="end"
                  id="chat-options"
                  items={[
                    { label: "Mute notifications" },
                    { label: "Search in conversation" },
                    {
                      borderTop: true,
                      color: "critical",
                      label: "Delete conversation",
                    },
                  ]}
                />
              </div>
            </header>
            <MessageList
              aria-label="Messages with Stella Nut"
              className="chat-message-list"
            >
              <li className="ui-divider">Today</li>
              <Message
                author="Stella"
                datetime="2026-10-08T14:02"
                start={
                  <Avatar aria-label="Stella Nut" role="img">
                    SN
                  </Avatar>
                }
                time="14:02"
              >
                <p>Heyyy! Did your band notice you changed strings yet?</p>
              </Message>
              <Message
                author="You"
                datetime="2026-10-08T14:18"
                outgoing
                time="14:18"
              >
                <p>
                  Nope! Played the whole gig on flatwounds AND in drop D. The
                  guitarist told the keyboard player "nice tone".
                </p>
              </Message>
              <Message
                author="You"
                datetime="2026-10-08T14:19"
                end="Read"
                outgoing
                time="14:19"
              >
                <p>
                  Can you send me the tab for your slap break? I'm gonna sneak
                  it into the encore.
                </p>
              </Message>
              <Message
                author="Stella"
                datetime="2026-10-08T14:31"
                start={
                  <Avatar aria-label="Stella Nut" role="img">
                    SN
                  </Avatar>
                }
                time="14:31"
              >
                <p>Totally! Here it is:</p>
                <Card variant="outlined">
                  <CardContent className="ui-layout-media ui-small">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
                      ></path>
                    </svg>
                    <div>
                      <a className="ui-link" href="#chat-file-tab">
                        slap-break-of-doom.gp
                      </a>
                      <p className="ui-caption">Guitar Pro, 48 KB</p>
                    </div>
                  </CardContent>
                </Card>
              </Message>
              <Message
                author="Stella"
                datetime="2026-10-08T14:32"
                start={
                  <Avatar aria-label="Stella Nut" role="img">
                    SN
                  </Avatar>
                }
                time="14:32"
              >
                <p>Nobody will hear it, but WE will know 🤘</p>
              </Message>
              <Message
                start={
                  <Avatar aria-label="Stella Nut" role="img">
                    SN
                  </Avatar>
                }
                typing
              >
                Stella is typing
              </Message>
            </MessageList>
            <div>
              <form action="#">
                <FieldGroup className="chat-composer" orientation="horizontal">
                  <Button aria-label="Attach a file" round type="button">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6z"
                      ></path>
                    </svg>
                  </Button>
                  <Textarea
                    aria-label="Message Stella Nut"
                    name="chat-message"
                    placeholder="Write something rad…"
                  />
                  <Button
                    aria-label="Send"
                    color="primary"
                    round
                    type="submit"
                    variant="filled"
                  >
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
                      ></path>
                    </svg>
                  </Button>
                </FieldGroup>
              </form>
            </div>
          </main>
        </div>
        <Drawer id="chat-drawer" scrollLock>
          <DrawerHeader closeButton>
            <DrawerTitle>Messages</DrawerTitle>
          </DrawerHeader>
          <List variant="transparent">
            <ListItem
              aria-current="page"
              end="14:32"
              href="#chat-stella"
              label="Stella Nut"
            />
            <ListItem
              end={
                <span className="chat-unread">
                  3 <span className="ui-sr-only">unread</span>
                </span>
              }
              href="#chat-low-end-theory"
              label="Low End Theory"
            />
            <ListItem end="11:05" href="#chat-percy" label="Percy Groove" />
            <ListItem end="Mon" href="#chat-ines" label="Ines Hertz" />
            <ListItem
              end="Sun"
              href="#chat-ignored-bassists"
              label="Ignored Bassists Anonymous"
            />
          </List>
        </Drawer>
      </div>
      <style>{`
        .chat {
          container-type: inline-size;

          .chat-sidebar {
            border-inline-end: var(--ui-border-width) solid var(--ui-border-color);
            display: none;

            @container (inline-size >= 56rem) {
              display: block;
            }
          }

          .chat-sidebar-header {
            padding: var(--ui-space-4) var(--ui-space-3) var(--ui-space-2);
          }

          .chat-unread {
            background-color: var(--ui-primary);
            border-radius: var(--ui-radius-round);
            color: var(--ui-on-primary);
            font-size: var(--ui-font-size-caption);
            font-weight: var(--ui-font-weight-semibold);
            line-height: 1;
            min-inline-size: var(--ui-space-5);
            padding: var(--ui-space-1) var(--ui-space-2);
            text-align: center;
          }

          main {
            display: grid;
            grid-template-rows: auto 1fr auto;
            min-inline-size: 0;
          }

          .chat-thread-header {
            border-block-end: var(--ui-border-width) solid var(--ui-border-color);
            padding: var(--ui-space-3);

            hgroup {
              flex: 1;
              min-inline-size: 0;
            }
          }

          .chat-conversations-button {
            @container (inline-size >= 56rem) {
              display: none;
            }
          }

          .chat-message-list {
            padding: var(--ui-space-4) var(--ui-space-3);

            @container (inline-size >= 40rem) {
              padding-inline: var(--ui-space-5);
            }
          }

          .chat-composer {
            border-block-start: var(--ui-border-width) solid var(--ui-border-color);
            padding: var(--ui-space-3);
          }
        }
      `}</style>
    </>
  )
}
