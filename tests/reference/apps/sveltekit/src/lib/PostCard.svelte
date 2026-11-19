<script lang="ts">
  import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Menu,
    ToggleButton,
    ToggleGroup,
  } from "opui-css/svelte"
  import { photo, user, type Post } from "reference-shared"
  import Icon from "./Icon.svelte"
  import UserAvatar from "./UserAvatar.svelte"

  let {
    onhide,
    ontogglesave,
    post,
    saved,
  }: {
    onhide: () => void
    ontogglesave: () => void
    post: Post
    saved: boolean
  } = $props()

  const author = $derived(user(post.author)!)
  const photos = $derived(post.photos.map((id) => photo(id)!))
  let reacted: string[] = $state([])

  const copyLink = () =>
    navigator.clipboard.writeText(`${location.origin}/posts/${post.id}`)
</script>

<Card aria-labelledby="post-{post.id}-author" as="article" variant="outlined">
  <CardHeader as="header">
    <UserAvatar link user={author} />
    <hgroup>
      <h2 id="post-{post.id}-author">
        <a href="/u/{author.handle}">{author.name}</a>
      </h2>
      <p><time datetime={post.datetime}>{post.time}</time></p>
    </hgroup>
    <Button
      aria-label="Options for {author.name}'s post"
      command="toggle-popover"
      commandfor="post-menu-{post.id}"
    >
      <Icon name="more" />
    </Button>
  </CardHeader>
  <Menu
    align="end"
    id="post-menu-{post.id}"
    items={[
      { label: "Copy link", onclick: copyLink },
      {
        form: `save-post-${post.id}`,
        label: saved ? "Remove from saved" : "Save post",
        type: "submit",
      },
      { label: "Hide post", onclick: onhide },
    ]}
  />
  <form
    hidden
    id="save-post-{post.id}"
    onsubmit={(event) => {
      event.preventDefault()
      ontogglesave()
    }}
  ></form>
  <CardContent>
    <p>{post.text}</p>
    {#if photos.length}
      <div class="app-post-photos">
        {#each photos as { alt, id, src } (id)}
          <img {alt} {src} />
        {/each}
      </div>
    {/if}
  </CardContent>
  <CardActions align="start">
    <ToggleGroup
      aria-label="Reactions"
      bind:value={reacted}
      multiple
      name="reactions-{post.id}"
      size="small"
    >
      {#each post.reactions as reaction (reaction.value)}
        <ToggleButton value={reaction.value}
          >{reaction.label}
          {reaction.count +
            (reacted.includes(reaction.value) ? 1 : 0)}</ToggleButton
        >
      {/each}
    </ToggleGroup>
  </CardActions>
</Card>
