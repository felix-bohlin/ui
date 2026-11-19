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

  const visible = $derived.by(() => {
    const all = [...created, ...loaded].filter(
      (post) => !hidden.includes(post.id),
    )
    if (filter === "photos")
      return [...created, ...POSTS]
        .filter((post) => !hidden.includes(post.id))
        .filter((post) => post.photos.length > 0)
    if (filter === "saved")
      return [...created, ...POSTS].filter(
        (post) => saved.includes(post.id) && !hidden.includes(post.id),
      )
    return all
  })

  const loadMore = async () => {
    loading = true
    const next = await fetchFeedPage(pageIndex + 1)
    pageIndex += 1
    loaded = next.posts
    hasMore = next.hasMore
    loading = false
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
    <Textarea
      bind:value={text}
      characterCount
      label="What's on your mind?"
      maxlength={280}
      name="text"
      required
    />
    <div>
      <Button type="submit" variant="filled">Post</Button>
    </div>
  </form>
  <ToggleGroup aria-label="Filter posts" bind:value={filter} name="filter">
    {#each FEED_FILTERS as { label, value } (value)}
      <ToggleButton {value}>{label}</ToggleButton>
    {/each}
  </ToggleGroup>
  {#if visible.length}
    <ol
      aria-busy={loading ? "true" : undefined}
      aria-label="Posts"
      class="app-posts"
    >
      {#each visible as post (post.id)}
        <li>
          <PostCard
            onhide={() => (hidden = [...hidden, post.id])}
            ontogglesave={() => toggleSave(post.id)}
            {post}
            saved={saved.includes(post.id)}
          />
        </li>
      {/each}
    </ol>
  {:else if filter === "saved"}
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
      <p class="app-end">You're all caught up.</p>
    {/if}
  {/if}
</div>
