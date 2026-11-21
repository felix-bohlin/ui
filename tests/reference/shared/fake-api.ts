import {
  CONVERSATIONS,
  ME,
  NOTIFICATIONS,
  PHOTOS,
  POSTS,
  USERS,
  type ChatLine,
  type Post,
} from "./data.ts"

export const PAGE_SIZE = 5
export const LATENCY = 400

const wait = (ms = LATENCY) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const user = (handle: string) =>
  USERS.find((candidate) => candidate.handle === handle)

export const me = () => user(ME)!

export const photo = (id: string) =>
  PHOTOS.find((candidate) => candidate.id === id)

export const feedPage = (page: number, filter: FeedFilter = "all") => {
  const posts = POSTS.filter((post) => matches(post, filter))
  const end = (page + 1) * PAGE_SIZE
  return { hasMore: end < posts.length, posts: posts.slice(0, end) }
}

export const fetchFeedPage = async (page: number, filter?: FeedFilter) => {
  await wait()
  return feedPage(page, filter)
}

export type FeedFilter = "all" | "photos" | "saved"

export const FEED_FILTERS: { label: string; value: FeedFilter }[] = [
  { label: "All", value: "all" },
  { label: "Photos", value: "photos" },
  { label: "Saved", value: "saved" },
]

const matches = (post: Post, filter: FeedFilter) =>
  filter === "all" ? true : filter === "photos" ? post.photos.length > 0 : false

export const newPost = (text: string, id: string): Post => ({
  author: ME,
  datetime: "2026-11-19T12:00",
  id,
  photos: [],
  reactions: [
    { count: 0, label: "Like", value: "like" },
    { count: 0, label: "Laugh", value: "laugh" },
    { count: 0, label: "Wow", value: "wow" },
  ],
  text,
  time: "Just now",
})

export const conversations = () =>
  CONVERSATIONS.map((conversation) => ({
    ...conversation,
    user: user(conversation.with)!,
  }))

export const conversation = (handle: string | null | undefined) => {
  const all = conversations()
  return all.find((candidate) => candidate.with === handle) ?? all[0]!
}

export const outgoing = (text: string, minute: number): ChatLine => {
  const time = `${12 + Math.floor(minute / 60)}:${String(minute % 60).padStart(2, "0")}`
  return {
    datetime: `2026-11-19T${time}`,
    from: ME,
    kind: "message",
    text,
    time,
  }
}

export const unreadNotifications = () =>
  NOTIFICATIONS.filter((notification) => !notification.read).length

export const postsBy = (handle: string) =>
  POSTS.filter((post) => post.author === handle)

export const photosBy = (handle: string) =>
  PHOTOS.filter((candidate) => candidate.by === handle)

export const verifyCode = async (code: string) => {
  await wait()
  return code === "123456"
}
