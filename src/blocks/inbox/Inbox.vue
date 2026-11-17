<script setup lang="ts">
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  List,
  ListItem,
  Textarea,
} from "opui-css/vue"
</script>

<template>
  <div class="inbox">
    <div
      class="ui-layout-columns ui-breakpoint-large"
      style="--_columns: 14rem 1fr; --_gap: 0"
    >
      <nav aria-label="Folders" class="inbox-folders">
        <Button type="button" variant="filled"
          ><svg
            data-icon="edit"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
            ></path></svg
          ><span class="ui-text">Compose</span></Button
        >
        <List dense variant="transparent">
          <ListItem
            aria-current="page"
            href="#inbox-folder-inbox"
            label="Inbox"
          >
            <template #start>
              <svg
                data-icon="inbox"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 12h-4a3 3 0 0 1-6 0H5V5h14z"
                ></path>
              </svg>
            </template>

            <template #end>3</template>
          </ListItem>
          <ListItem href="#inbox-folder-starred" label="Starred">
            <template #start>
              <svg
                data-icon="star"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                ></path>
              </svg>
            </template>
          </ListItem>
          <ListItem href="#inbox-folder-sent" label="Sent">
            <template #start>
              <svg
                data-icon="send"
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
            </template>
          </ListItem>
          <ListItem href="#inbox-folder-drafts" label="Drafts">
            <template #start>
              <svg
                data-icon="document"
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
            </template>

            <template #end>2</template>
          </ListItem>
          <ListItem href="#inbox-folder-archive" label="Archive">
            <template #start>
              <svg
                data-icon="archive"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20.54 5.23 19.15 3.55A1.45 1.45 0 0 0 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23A2 2 0 0 0 3 6.5V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.5c0-.48-.17-.93-.46-1.27M12 17.5 6.5 12H10v-2h4v2h3.5zM5.12 5l.81-1h12l.94 1z"
                ></path>
              </svg>
            </template>
          </ListItem>
          <ListItem href="#inbox-folder-trash" label="Trash">
            <template #start>
              <svg
                data-icon="delete"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                ></path>
              </svg>
            </template>
          </ListItem>
        </List>
        <p class="ui-overline inbox-label-heading" id="inbox-labels-heading">
          Labels
        </p>
        <List
          aria-labelledby="inbox-labels-heading"
          dense
          variant="transparent"
        >
          <ListItem href="#inbox-label-gigs" label="Gigs">
            <template #start>
              <span class="ui-swatch ui-info"></span>
            </template>
          </ListItem>
          <ListItem href="#inbox-label-gear" label="Gear">
            <template #start>
              <span class="ui-swatch ui-success"></span>
            </template>
          </ListItem>
          <ListItem href="#inbox-label-band" label="Band">
            <template #start>
              <span class="ui-swatch ui-warning"></span>
            </template>
          </ListItem>
        </List>
      </nav>
      <main class="ui-layout-columns" style="--_columns: 20rem 1fr; --_gap: 0">
        <section aria-labelledby="inbox-heading" class="inbox-list">
          <div class="ui-layout-row ui-small ui-spread inbox-list-header">
            <div class="ui-layout-row ui-small">
              <Button
                aria-label="Open folders"
                class="inbox-menu-button"
                command="show-modal"
                commandfor="inbox-drawer"
                round
                size="small"
                type="button"
                ><svg
                  data-icon="menu"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
                  ></path></svg
              ></Button>
              <h1 class="ui-h5" id="inbox-heading">Inbox</h1>
            </div>
            <span class="ui-caption">3 unread</span>
          </div>
          <List class="inbox-messages" variant="transparent">
            <ListItem
              aria-current="page"
              class="inbox-unread"
              href="#inbox-message-1"
            >
              <template #start>
                <Badge dot label="Unread"
                  ><Avatar aria-label="Holly Humbucker" role="img"
                    >HH</Avatar
                  ></Badge
                >
              </template>
              <template #label>
                <span>Holly Humbucker</span>
                <time class="ui-caption" datetime="2026-10-08T09:41"
                  >09:41</time
                >
              </template>
              <p class="inbox-subject">You're IN! Gig details inside</p>
              <p class="inbox-snippet">
                Woohoo, Brad and the Brads said YES to a bassist. Attached is
                the setlist…
              </p>
            </ListItem>
            <ListItem class="inbox-unread" href="#inbox-message-2">
              <template #start>
                <Badge dot label="Unread"
                  ><Avatar aria-label="Ines Hertz" role="img">IH</Avatar></Badge
                >
              </template>
              <template #label>
                <span>Ines Hertz</span>
                <time class="ui-caption" datetime="2026-10-08T08:12"
                  >08:12</time
                >
              </template>
              <p class="inbox-subject">Jam night on Thursday</p>
              <p class="inbox-snippet">
                Here's a rough plan for the evening. Tell me if we should swap
                the slap battle…
              </p>
            </ListItem>
            <ListItem class="inbox-unread" href="#inbox-message-3">
              <template #start>
                <Badge dot label="Unread"
                  ><Avatar aria-label="Bassbook Gold" role="img"
                    >B</Avatar
                  ></Badge
                >
              </template>
              <template #label>
                <span>Bassbook Gold</span>
                <time class="ui-caption" datetime="2026-10-07T17:30"
                  >Yesterday</time
                >
              </template>
              <p class="inbox-subject">Receipt #2026-0412 is ready</p>
              <p class="inbox-snippet">
                Your totally rad Gold membership for September (€3) is ready to
                download.
              </p>
            </ListItem>
            <ListItem href="#inbox-message-4">
              <template #start>
                <Avatar aria-label="Stella Nut" role="img">SN</Avatar>
              </template>
              <template #label>
                <span>Stella Nut</span>
                <time class="ui-caption" datetime="2026-10-06T14:05">Mon</time>
              </template>
              <p class="inbox-subject">Re: Photos from band camp</p>
              <p class="inbox-snippet">
                Haha, the one where you're behind the drum kit is my fave.
                Uploading the rest tonight.
              </p>
            </ListItem>
            <ListItem href="#inbox-message-5">
              <template #start>
                <Avatar aria-label="Percy Groove" role="img">PG</Avatar>
              </template>
              <template #label>
                <span>Percy Groove</span>
                <time class="ui-caption" datetime="2026-10-03T11:20"
                  >3 Oct</time
                >
              </template>
              <p class="inbox-subject">Setlist review (0 bass solos)</p>
              <p class="inbox-snippet">
                Thanks everyone for the input. The drummer gets two solos,
                again.
              </p>
            </ListItem>
          </List>
        </section>
        <article
          aria-labelledby="inbox-subject"
          class="ui-layout-column ui-large inbox-reader"
        >
          <div class="ui-layout-row ui-x-small ui-spread">
            <div
              aria-label="Message actions"
              class="ui-layout-row ui-x-small"
              role="group"
            >
              <Button aria-label="Archive" round size="small" type="button"
                ><svg
                  data-icon="archive"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20.54 5.23 19.15 3.55A1.45 1.45 0 0 0 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23A2 2 0 0 0 3 6.5V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.5c0-.48-.17-.93-.46-1.27M12 17.5 6.5 12H10v-2h4v2h3.5zM5.12 5l.81-1h12l.94 1z"
                  ></path></svg
              ></Button>
              <Button aria-label="Delete" round size="small" type="button"
                ><svg
                  data-icon="delete"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                  ></path></svg
              ></Button>
              <Button
                aria-label="Star"
                aria-pressed="false"
                round
                size="small"
                type="button"
                ><svg
                  data-icon="star"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"
                  ></path></svg
              ></Button>
            </div>
            <div class="ui-layout-row ui-x-small">
              <Button size="small" type="button" variant="outlined"
                ><svg
                  data-icon="reply"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11"
                  ></path></svg
                ><span class="ui-text">Reply</span></Button
              >
              <Button size="small" type="button" variant="outlined"
                ><span class="ui-text">Forward</span
                ><svg
                  data-icon="forward"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11"
                  ></path></svg
              ></Button>
            </div>
          </div>
          <div class="ui-layout-column ui-small">
            <h2 class="ui-h4" id="inbox-subject">
              You're IN! Gig details inside
            </h2>
            <div class="ui-layout-row ui-x-small">
              <Chip
                as="span"
                dot
                label="Gigs"
                severity="info"
                size="small"
                variant="outlined"
              />
              <Chip as="span" label="Inbox" size="small" variant="outlined" />
            </div>
          </div>
          <div class="ui-layout-row">
            <Avatar aria-label="Holly Humbucker" role="img">HH</Avatar>
            <div class="inbox-sender-info">
              <p>
                <strong>Holly Humbucker</strong>{{ " "
                }}<span class="ui-caption"
                  >holly@humbucker-booking.example</span
                >
              </p>
              <p class="ui-caption">To you and Percy Groove</p>
            </div>
            <time class="ui-caption" datetime="2026-10-08T09:41"
              >Wed 8 Oct, 09:41</time
            >
          </div>
          <div class="ui-layout-column inbox-body">
            <p>Heyyy Rory,</p>
            <p>
              Totally awesome news, Brad and the Brads want a real bassist
              (you!). Attached is the setlist, plus the bass tabs we talked
              about on Monday.
            </p>
            <p>What happens next:</p>
            <ul>
              <li>Soundcheck at The Rusty Fret on 15 October</li>
              <li>First rehearsal in week 44 (bring earplugs)</li>
              <li>Merch money goes to merch@brads.example</li>
            </ul>
            <p>They promised to turn you UP this time! &lt;3</p>
            <p>Holly</p>
          </div>
          <div class="ui-layout-row ui-small">
            <Chip
              href="#inbox-attachment-setlist"
              label="Setlist-final-final.pdf, 1.2 MB"
              variant="outlined"
            >
              <template #start>
                <svg
                  data-icon="attach"
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
              </template>
            </Chip>
            <Chip
              href="#inbox-attachment-tabs"
              label="Bass-tabs-v3.pdf, 340 KB"
              variant="outlined"
            >
              <template #start>
                <svg
                  data-icon="attach"
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
              </template>
            </Chip>
          </div>
          <form action="#" class="ui-layout-column ui-small inbox-reply">
            <Textarea
              id="inbox-inbox-reply"
              label="Reply to Holly"
              name="inbox-reply"
              placeholder="Write something rad…"
            />
            <Button size="small" type="submit" variant="filled">Send</Button>
          </form>
        </article>
      </main>
    </div>
    <Drawer id="inbox-drawer" scrollLock>
      <DrawerHeader closeButton closeLabel="Close folders">
        <DrawerTitle>Folders</DrawerTitle>
      </DrawerHeader>
      <DrawerContent>
        <nav aria-label="Folders">
          <List variant="transparent">
            <ListItem
              aria-current="page"
              href="#inbox-folder-inbox"
              label="Inbox"
            >
              <template #end>3</template>
            </ListItem>
            <ListItem href="#inbox-folder-starred" label="Starred" />
            <ListItem href="#inbox-folder-sent" label="Sent" />
            <ListItem href="#inbox-folder-drafts" label="Drafts">
              <template #end>2</template>
            </ListItem>
            <ListItem href="#inbox-folder-archive" label="Archive" />
            <ListItem href="#inbox-folder-trash" label="Trash" />
          </List>
        </nav>
      </DrawerContent>
    </Drawer>
  </div>
</template>

<style>
.inbox {
  container-type: inline-size;

  .inbox-menu-button {
    @container (inline-size >= 72rem) {
      display: none;
    }
  }

  .inbox-folders {
    border-inline-end: var(--ui-border-width) solid var(--ui-border-color);
    display: none;
    padding: var(--ui-space-3) var(--ui-space-2);

    @container (inline-size >= 72rem) {
      display: block;
    }

    .ui-button {
      inline-size: 100%;
      margin-block-end: var(--ui-space-2);
    }
  }

  .inbox-label-heading {
    padding: var(--ui-space-3) var(--ui-space-3) 0;
  }

  .inbox-list {
    border-block-end: var(--ui-border-width) solid var(--ui-border-color);

    @container (inline-size >= 56rem) {
      border-block-end: 0;
      border-inline-end: var(--ui-border-width) solid var(--ui-border-color);
    }
  }

  .inbox-list-header {
    padding: var(--ui-space-3) var(--ui-space-3) var(--ui-space-1);
  }

  .inbox-messages {
    .ui-text p:first-child {
      display: flex;
      gap: var(--ui-space-2);
      justify-content: space-between;
    }

    time {
      flex-shrink: 0;
    }

    .inbox-subject {
      color: var(--ui-text-strong);
      font-size: var(--ui-font-size-small);
    }

    .inbox-snippet {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    [aria-current="page"] :is(.inbox-subject, time) {
      color: inherit;
    }
  }

  .inbox-unread {
    .ui-text p:first-child span,
    .inbox-subject {
      font-weight: var(--ui-font-weight-semibold);
    }
  }

  .inbox-reader {
    padding: var(--ui-space-4);

    @container (inline-size >= 56rem) {
      padding: var(--ui-space-5);
    }
  }

  .inbox-sender-info {
    flex: 1;
    min-inline-size: 0;
  }

  .inbox-body,
  .inbox-reply {
    max-inline-size: 42rem;
  }

  .inbox-reply .ui-button {
    align-self: end;
  }
}
</style>
