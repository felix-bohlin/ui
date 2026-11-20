"use client"

import { Button, Textarea, ToggleButton, ToggleGroup } from "opui-css/react"
import {
  FEED_FILTERS,
  POSTS,
  feedPage,
  fetchFeedPage,
  newPost,
  type FeedFilter,
  type Post,
} from "reference-shared"
import { useRef, useState, useTransition, type MouseEvent } from "react"
import { flushSync } from "react-dom"
import PostCard from "@/lib/post-card"

const first = feedPage(0)

const isFilter = (value: string): value is FeedFilter =>
  FEED_FILTERS.some((filter) => filter.value === value)

export default function Feed() {
  const [pageIndex, setPageIndex] = useState(0)
  const [loaded, setLoaded] = useState<Post[]>(first.posts)
  const [hasMore, setHasMore] = useState(first.hasMore)
  const [loading, startLoading] = useTransition()
  const [created, setCreated] = useState<Post[]>([])
  const [hidden, setHidden] = useState<string[]>([])
  const [saved, setSaved] = useState<string[]>([])
  const [filter, setFilter] = useState<FeedFilter>("all")
  const list = useRef<HTMLOListElement>(null)
  const authorLinks = useRef(new Map<string, HTMLAnchorElement>())
  const focusEnd = useRef(false)

  const shown = (post: Post) => !hidden.includes(post.id)
  const visible =
    filter === "photos"
      ? [...created, ...POSTS].filter(
          (post) => shown(post) && post.photos.length > 0,
        )
      : filter === "saved"
        ? [...created, ...POSTS].filter(
            (post) => shown(post) && saved.includes(post.id),
          )
        : [...created, ...loaded].filter(shown)

  const loadMore = (event: MouseEvent<HTMLButtonElement>) => {
    focusEnd.current = event.currentTarget === document.activeElement
    startLoading(async () => {
      const next = await fetchFeedPage(pageIndex + 1)
      startLoading(() => {
        setPageIndex(pageIndex + 1)
        setLoaded(next.posts)
        setHasMore(next.hasMore)
      })
    })
  }

  const hide = (id: string) => {
    const at = visible.findIndex((post) => post.id === id)
    const target = visible[at + 1] ?? visible[at - 1]
    flushSync(() => setHidden((ids) => [...ids, id]))
    ;(target ? authorLinks.current.get(target.id) : list.current)?.focus()
  }

  const post = (form: FormData) =>
    setCreated((posts) => [
      newPost(String(form.get("text")), `new-${posts.length + 1}`),
      ...posts,
    ])

  const toggleSave = (id: string) =>
    setSaved((ids) =>
      ids.includes(id)
        ? ids.filter((candidate) => candidate !== id)
        : [...ids, id],
    )

  return (
    <div className="app-screen" data-screen="feed">
      <h1>Feed</h1>
      <form action={post} aria-label="New post" className="ui-layout-column">
        <Textarea
          characterCount
          htmlFor="feed-post"
          label="What's on your mind?"
        >
          <textarea
            aria-describedby="feed-post-end-text"
            id="feed-post"
            maxLength={280}
            name="text"
            required
          />
        </Textarea>
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
        value={filter}
      >
        {FEED_FILTERS.map(({ label, value }) => (
          <ToggleButton key={value} value={value}>
            {label}
          </ToggleButton>
        ))}
      </ToggleGroup>
      {filter === "saved" && visible.length === 0 ? (
        <p className="app-empty">No saved posts yet.</p>
      ) : (
        <ol
          aria-busy={loading || undefined}
          aria-label="Posts"
          className="app-posts"
          ref={list}
          tabIndex={-1}
        >
          {visible.map((post) => (
            <li key={post.id}>
              <PostCard
                authorRef={(link) => {
                  if (link) authorLinks.current.set(post.id, link)
                  return () => {
                    authorLinks.current.delete(post.id)
                  }
                }}
                onHide={() => hide(post.id)}
                onToggleSave={() => toggleSave(post.id)}
                post={post}
                saved={saved.includes(post.id)}
              />
            </li>
          ))}
        </ol>
      )}
      {filter === "all" &&
        (hasMore ? (
          <div>
            <Button disabled={loading} onClick={loadMore} variant="outlined">
              Load more
            </Button>
          </div>
        ) : (
          <p
            className="app-end"
            ref={(end) => {
              if (end && focusEnd.current) end.focus()
              focusEnd.current = false
            }}
            tabIndex={-1}
          >
            You're all caught up.
          </p>
        ))}
    </div>
  )
}
