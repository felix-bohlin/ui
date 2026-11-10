import { List, ListItem } from "opui-css/react"

export default function StartVideo() {
  return (
    <List>
      <ListItem
        description="Uploaded by Lena Ek"
        end="1:30"
        label="Product tour"
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
        description="Uploaded by Tom Tanaka"
        end="0:45"
        label="Release highlights"
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
