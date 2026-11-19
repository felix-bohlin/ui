"use client"

import Link from "next/link"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Menu,
  ToggleButton,
  ToggleGroup,
} from "opui-css/react"
import { photo, user, type Post } from "reference-shared"
import { useState, type Ref } from "react"
import Icon from "./icon"
import UserAvatar from "./user-avatar"

export default function PostCard({
  authorRef,
  onHide,
  onToggleSave,
  post,
  saved,
}: {
  authorRef: Ref<HTMLAnchorElement>
  onHide: () => void
  onToggleSave: () => void
  post: Post
  saved: boolean
}) {
  const author = user(post.author)!
  const photos = post.photos.map((id) => photo(id)!)
  const [reacted, setReacted] = useState<string[]>([])

  const copyLink = () =>
    navigator.clipboard.writeText(`${location.origin}/posts/${post.id}`)

  return (
    <Card
      aria-labelledby={`post-${post.id}-author`}
      as="article"
      variant="outlined"
    >
      <CardHeader as="header">
        <UserAvatar user={author} />
        <hgroup>
          <h2 id={`post-${post.id}-author`}>
            <Link href={`/u/${author.handle}`} ref={authorRef}>
              {author.name}
            </Link>
          </h2>
          <p>
            <time dateTime={post.datetime}>{post.time}</time>
          </p>
        </hgroup>
        <Button
          aria-label={`Options for ${author.name}'s post`}
          command="toggle-popover"
          commandfor={`post-menu-${post.id}`}
        >
          <Icon name="more" />
        </Button>
      </CardHeader>
      <Menu
        align="end"
        id={`post-menu-${post.id}`}
        items={[
          { label: "Copy link", onClick: copyLink },
          {
            form: `save-post-${post.id}`,
            label: saved ? "Remove from saved" : "Save post",
            type: "submit",
          },
          { label: "Hide post", onClick: onHide },
        ]}
      />
      <form
        hidden
        id={`save-post-${post.id}`}
        onSubmit={(event) => {
          event.preventDefault()
          onToggleSave()
        }}
      />
      <CardContent>
        <p>{post.text}</p>
        {photos.length > 0 && (
          <div className="app-post-photos">
            {photos.map(({ alt, id, src }) => (
              <img alt={alt} key={id} src={src} />
            ))}
          </div>
        )}
      </CardContent>
      <CardActions align="start">
        <ToggleGroup
          aria-label="Reactions"
          multiple
          name={`reactions-${post.id}`}
          onValueChange={setReacted}
          size="small"
          value={reacted}
        >
          {post.reactions.map((reaction) => (
            <ToggleButton key={reaction.value} value={reaction.value}>
              {reaction.label}{" "}
              {reaction.count + (reacted.includes(reaction.value) ? 1 : 0)}
            </ToggleButton>
          ))}
        </ToggleGroup>
      </CardActions>
    </Card>
  )
}
