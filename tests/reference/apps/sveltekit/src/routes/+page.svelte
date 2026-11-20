<script lang="ts">
  import { Button, Textarea, ToggleButton, ToggleGroup } from "opui-css/svelte"
  import {
    FEED_FILTERS,
    POSTS,
    feedPage,
    fetchFeedPage,
    newPost,
    type FeedFilter,
    type Post,
  } from "reference-shared"
  import { tick } from "svelte"
  import PostCard from "#lib/PostCard.svelte"

  const first = feedPage(0)
  let pageIndex = $state(0)
  let loaded: Post[] = $state(first.posts)
  let hasMore = $state(first.hasMore)
  let loading = $state(false)
  let created: Post[] = $state([])
  let hidden: string[] = $state([])
  let saved: string[] = $state([])
  let filter: FeedFilter = $state("all")
  let text = $state("")
  let list: HTMLOListElement | undefined = $state()
  let end: HTMLParagraphElement | undefined = $state()

  const visible = $derived.by(() => {
    if (filter === "photos")
      return [...created, ...POSTS]
        .filter((post) => !hidden.includes(post.id))
        .filter((post) => post.photos.length > 0)
    if (filter === "saved")
      return [...created, ...POSTS].filter(
        (post) => saved.includes(post.id) && !hidden.includes(post.id),
      )
    return [...created, ...loaded].filter((post) => !hidden.includes(post.id))
  })

  const hide = async (id: string) => {
    const at = visible.findIndex((post) => post.id === id)
    const next = visible[at + 1] ?? visible[at - 1]
    hidden = [...hidden, id]
    await tick()
    const target = next
      ? list?.querySelector<HTMLElement>(`#post-${next.id}-author a`)
      : list
    target?.focus()
  }

  const loadMore = async (event: MouseEvent) => {
    const hadFocus = document.activeElement === event.currentTarget
    loading = true
    const next = await fetchFeedPage(pageIndex + 1)
    pageIndex += 1
    loaded = next.posts
    hasMore = next.hasMore
    loading = false
    if (hadFocus && !hasMore) {
      await tick()
      end?.focus()
    }
  }

  const submit = (event: SubmitEvent) => {
    event.preventDefault()
    created = [newPost(text, `new-${created.length + 1}`), ...created]
    text = ""
  }

  const toggleSave = (id: string) => {
    saved = saved.includes(id)
      ? saved.filter((candidate) => candidate !== id)
      : [...saved, id]
  }
</script>

<svelte:head>
  <title>Feed | Reference</title>
</svelte:head>

<div class="app-screen" data-screen="feed">
  <h1>Feed</h1>
  <form aria-label="New post" class="ui-layout-column" onsubmit={submit}>
    <Textarea characterCount for="feed-post" label="What's on your mind?">
      <textarea
        aria-describedby="feed-post-end-text"
        bind:value={text}
        id="feed-post"
        maxlength={280}
        name="text"
        required></textarea>
    </Textarea>
    <div>
      <Button type="submit" variant="filled">Post</Button>
    </div>
  </form>
  <ToggleGroup aria-label="Filter posts" bind:value={filter} name="filter">
    {#each FEED_FILTERS as { label, value } (value)}
      <ToggleButton {value}>{label}</ToggleButton>
    {/each}
  </ToggleGroup>
  <ol
    aria-busy={loading ? "true" : undefined}
    aria-label="Posts"
    bind:this={list}
    class="app-posts"
    tabindex="-1"
  >
    {#each visible as post (post.id)}
      <li>
        <PostCard
          onhide={() => hide(post.id)}
          ontogglesave={() => toggleSave(post.id)}
          {post}
          saved={saved.includes(post.id)}
        />
      </li>
    {/each}
  </ol>
  {#if !visible.length && filter === "saved"}
    <p class="app-empty">No saved posts yet.</p>
  {/if}
  {#if filter === "all"}
    {#if hasMore}
      <div>
        <Button disabled={loading} onclick={loadMore} variant="outlined"
          >Load more</Button
        >
      </div>
    {:else}
      <p bind:this={end} class="app-end" tabindex="-1">You're all caught up.</p>
    {/if}
  {/if}
</div>
