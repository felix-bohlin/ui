import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Menu,
  ToggleButton,
  ToggleGroup,
} from "opui-css/solid"
import { photo, user, type Post } from "reference-shared"
import { createMemo, createSignal, For, Show } from "solid-js"
import Icon from "./Icon"
import UserAvatar from "./UserAvatar"

type Props = {
  onHide: () => void
  onToggleSave: () => void
  post: Post
  saved: boolean
}

export default function PostCard(props: Props) {
  const author = createMemo(() => user(props.post.author)!)
  const photos = createMemo(() => props.post.photos.map((id) => photo(id)!))
  const [reacted, setReacted] = createSignal<string[]>([])

  const copyLink = () =>
    navigator.clipboard.writeText(`${location.origin}/posts/${props.post.id}`)

  return (
    <Card
      aria-labelledby={`post-${props.post.id}-author`}
      as="article"
      variant="outlined"
    >
      <CardHeader as="header">
        <UserAvatar link user={author()} />
        <hgroup>
          <h2 id={`post-${props.post.id}-author`}>
            <a href={`/u/${author().handle}`}>{author().name}</a>
          </h2>
          <p>
            <time datetime={props.post.datetime}>{props.post.time}</time>
          </p>
        </hgroup>
        <Button
          aria-label={`Options for ${author().name}'s post`}
          command="toggle-popover"
          commandfor={`post-menu-${props.post.id}`}
        >
          <Icon name="more" />
        </Button>
      </CardHeader>
      <Menu
        align="end"
        id={`post-menu-${props.post.id}`}
        items={[
          { label: "Copy link", onClick: copyLink },
          {
            form: `save-post-${props.post.id}`,
            label: props.saved ? "Remove from saved" : "Save post",
            type: "submit",
          },
          { label: "Hide post", onClick: props.onHide },
        ]}
      />
      <form
        hidden
        id={`save-post-${props.post.id}`}
        onSubmit={(event) => {
          event.preventDefault()
          props.onToggleSave()
        }}
      />
      <CardContent>
        <p>{props.post.text}</p>
        <Show when={photos().length}>
          <div class="app-post-photos">
            <For each={photos()}>
              {(item) => <img alt={item.alt} src={item.src} />}
            </For>
          </div>
        </Show>
      </CardContent>
      <CardActions align="start">
        <ToggleGroup
          aria-label="Reactions"
          multiple
          name={`reactions-${props.post.id}`}
          onValueChange={setReacted}
          size="small"
          value={reacted()}
        >
          <For each={props.post.reactions}>
            {(reaction) => (
              <ToggleButton value={reaction.value}>
                {reaction.label}{" "}
                {reaction.count + (reacted().includes(reaction.value) ? 1 : 0)}
              </ToggleButton>
            )}
          </For>
        </ToggleGroup>
      </CardActions>
    </Card>
  )
}
