import { Button, Textarea, ToggleButton, ToggleGroup } from "opui-css/solid"
import {
  FEED_FILTERS,
  POSTS,
  feedPage,
  fetchFeedPage,
  newPost,
  type FeedFilter,
  type Post,
} from "reference-shared"
import { createMemo, createSignal, flush, For, Show } from "solid-js"
import PostCard from "../lib/PostCard"
import { useTitle } from "../lib/title"

const isFilter = (value: string): value is FeedFilter =>
  FEED_FILTERS.some((filter) => filter.value === value)

export default function Feed() {
  useTitle(() => "Feed")
  const first = feedPage(0)
  const [pageIndex, setPageIndex] = createSignal(0)
  const [loaded, setLoaded] = createSignal<Post[]>(first.posts)
  const [hasMore, setHasMore] = createSignal(first.hasMore)
  const [loading, setLoading] = createSignal(false)
  const [created, setCreated] = createSignal<Post[]>([])
  const [hidden, setHidden] = createSignal<string[]>([])
  const [saved, setSaved] = createSignal<string[]>([])
  const [filter, setFilter] = createSignal<FeedFilter>("all")
  const [text, setText] = createSignal("")
  let list: HTMLOListElement | undefined
  let end: HTMLParagraphElement | undefined

  const visible = createMemo(() => {
    const shown = (post: Post) => !hidden().includes(post.id)
    if (filter() === "photos")
      return [...created(), ...POSTS].filter(
        (post) => shown(post) && post.photos.length > 0,
      )
    if (filter() === "saved")
      return [...created(), ...POSTS].filter(
        (post) => shown(post) && saved().includes(post.id),
      )
    return [...created(), ...loaded()].filter(shown)
  })

  const loadMore = async (event: MouseEvent) => {
    const hadFocus = document.activeElement === event.currentTarget
    setLoading(true)
    const next = await fetchFeedPage(pageIndex() + 1)
    setPageIndex((index) => index + 1)
    setLoaded(next.posts)
    setHasMore(next.hasMore)
    setLoading(false)
    if (next.hasMore || !hadFocus) return
    flush()
    end?.focus()
  }

  const hide = (id: string) => {
    const shown = visible()
    const at = shown.findIndex((post) => post.id === id)
    const neighbor = shown[at + 1] ?? shown[at - 1]
    setHidden((ids) => [...ids, id])
    flush()
    const target = neighbor
      ? document.querySelector<HTMLElement>(`#post-${neighbor.id}-author a`)
      : list
    target?.focus()
  }

  const submit = (event: SubmitEvent) => {
    event.preventDefault()
    setCreated((posts) => [
      newPost(text(), `new-${posts.length + 1}`),
      ...posts,
    ])
    setText("")
  }

  const toggleSave = (id: string) =>
    setSaved((ids) =>
      ids.includes(id)
        ? ids.filter((candidate) => candidate !== id)
        : [...ids, id],
    )

  return (
    <div class="app-screen" data-screen="feed">
      <h1>Feed</h1>
      <form aria-label="New post" class="ui-layout-column" onSubmit={submit}>
        <Textarea
          characterCount
          label="What's on your mind?"
          maxlength={280}
          name="text"
          onInput={(event) => setText(event.currentTarget.value)}
          required
          value={text()}
        />
        <div>
          <Button type="submit" variant="filled">
            Post
          </Button>
        </div>
      </form>
      <ToggleGroup
        aria-label="Filter posts"
        name="filter"
        onValueChange={(value) => {
          if (isFilter(value)) setFilter(value)
        }}
        value={filter()}
      >
        <For each={FEED_FILTERS}>
          {(item) => (
            <ToggleButton value={item.value}>{item.label}</ToggleButton>
          )}
        </For>
      </ToggleGroup>
      <ol
        aria-busy={loading() ? "true" : undefined}
        aria-label="Posts"
        class="app-posts"
        ref={(element) => (list = element)}
        tabindex="-1"
      >
        <For each={visible()}>
          {(post) => (
            <li>
              <PostCard
                onHide={() => hide(post.id)}
                onToggleSave={() => toggleSave(post.id)}
                post={post}
                saved={saved().includes(post.id)}
              />
            </li>
          )}
        </For>
      </ol>
      <Show when={filter() === "saved" && !visible().length}>
        <p class="app-empty">No saved posts yet.</p>
      </Show>
      <Show when={filter() === "all"}>
        <Show
          when={hasMore()}
          fallback={
            <p class="app-end" ref={(element) => (end = element)} tabindex="-1">
              You're all caught up.
            </p>
          }
        >
          <div>
            <Button disabled={loading()} onClick={loadMore} variant="outlined">
              Load more
            </Button>
          </div>
        </Show>
      </Show>
    </div>
  )
}
