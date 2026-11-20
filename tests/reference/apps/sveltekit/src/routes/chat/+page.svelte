<script lang="ts">
  import { page } from "$app/state"
  import {
    Button,
    List,
    ListItem,
    Message,
    MessageList,
    Textarea,
  } from "opui-css/svelte"
  import {
    ME,
    conversation,
    conversations,
    outgoing,
    user,
  } from "reference-shared"
  import { getSent } from "#lib/chat.svelte.ts"
  import UserAvatar from "#lib/UserAvatar.svelte"

  const all = conversations()
  const sent = getSent()
  const open = $derived(conversation(page.url.searchParams.get("with")))
  const lines = $derived([...open.lines, ...(sent[open.with] ?? [])])
  let text = $state("")

  const send = (event: SubmitEvent) => {
    event.preventDefault()
    const mine = sent[open.with] ?? []
    sent[open.with] = [...mine, outgoing(text, mine.length)]
    text = ""
  }
</script>

<svelte:head>
  <title>Chat | Reference</title>
</svelte:head>

<div class="app-screen" data-screen="chat">
  <h1>Chat</h1>
  <div class="app-chat">
    <nav aria-label="Conversations">
      <List variant="transparent">
        {#each all as item (item.with)}
          <ListItem
            aria-current={item.with === open.with ? "page" : undefined}
            description={item.unread ? `${item.unread} unread` : undefined}
            href="/chat?with={item.with}"
            label={item.user.name}
          >
            {#snippet start()}
              <UserAvatar size="small" user={item.user} />
            {/snippet}
          </ListItem>
        {/each}
      </List>
    </nav>
    <section aria-labelledby="chat-title" class="app-screen">
      <h2 id="chat-title">{open.user.name}</h2>
      <MessageList aria-label="Messages with {open.user.name}" direct>
        {#each lines as line}
          {#if line.kind === "divider"}
            <li class="ui-divider">{line.label}</li>
          {:else}
            {@const author = user(line.from)!}
            <Message
              author={author.name}
              datetime={line.datetime}
              outgoing={line.from === ME}
              time={line.time}
            >
              {#snippet start()}
                {#if line.from !== ME}
                  <UserAvatar size="small" user={author} />
                {/if}
              {/snippet}
              <p>{line.text}</p>
            </Message>
          {/if}
        {/each}
      </MessageList>
      <form
        aria-label="Send a message"
        class="ui-layout-column"
        onsubmit={send}
      >
        <Textarea
          bind:value={text}
          hideLabel
          label="Message"
          name="text"
          required
        />
        <div>
          <Button type="submit" variant="filled">Send</Button>
        </div>
      </form>
    </section>
  </div>
</div>
