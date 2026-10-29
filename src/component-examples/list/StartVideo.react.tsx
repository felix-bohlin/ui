import { List, ListItem } from "opui-css/react"

export default function StartVideo() {
  return (
    <List>
      <ListItem
        label="Headline"
        description="Supporting text"
        start={
          <video controls muted>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
        }
        end="13:37"
      />
      <ListItem
        label="Headline"
        description="Supporting text"
        start={
          <video controls muted>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
        }
        end="90s"
      />
    </List>
  )
}
