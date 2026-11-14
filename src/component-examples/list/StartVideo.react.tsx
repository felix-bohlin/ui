import { List, ListItem } from "opui-css/react"

export default function StartVideo() {
  return (
    <List>
      <ListItem
        description="Uploaded by Lou Headstock"
        end="1:30"
        label="Slap tutorial"
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
        description="Uploaded by Percy Groove"
        end="0:45"
        label="Drop D in 45 seconds"
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
