import { For } from "solid-js"

import { Carousel } from "opui-css/solid"

const videos = [
  { label: "A red flower bud opening", name: "flower" },
  { label: "Scene from a black-and-white film", name: "friday" },
]

export default function Example() {
  return (
    <Carousel label="Videos" markers>
      <For each={videos}>
        {({ label, name }) => (
          <li>
            <video
              aria-label={label}
              controls
              playsinline
              preload="metadata"
              src={`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/${name}.mp4`}
            ></video>
          </li>
        )}
      </For>
    </Carousel>
  )
}
