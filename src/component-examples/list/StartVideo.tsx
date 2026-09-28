import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem
        headline="Headline"
        description="Supporting text"
        start={
          <video controls muted>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
        }
        end={<div>13:37</div>}
      />
      <ListItem
        headline="Headline"
        description="Supporting text"
        start={
          <video controls muted>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
        }
        end={<div>90s</div>}
      />
    </List>
  )
}
