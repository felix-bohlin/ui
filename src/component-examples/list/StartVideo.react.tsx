import { List, ListItem } from "opui-css/react"

export default function StartVideo() {
  return (
    <List>
      <ListItem
        description="Supporting text"
        end="13:37"
        label="Headline"
        start={
          <video controls muted>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
        }
      />
      <ListItem
        description="Supporting text"
        end="90s"
        label="Headline"
        start={
          <video controls muted>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
        }
      />
    </List>
  )
}
