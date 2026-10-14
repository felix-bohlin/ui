import { Carousel } from "opui-css/react"

const videos = [
  { label: "A red flower bud opening", name: "flower" },
  { label: "Scene from a black-and-white film", name: "friday" },
]

export default function Videos() {
  return (
    <Carousel label="Videos" markers>
      {videos.map(({ label, name }) => (
        <li key={name}>
          <video
            aria-label={label}
            controls
            playsInline
            preload="metadata"
            src={`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/${name}.mp4`}
          ></video>
        </li>
      ))}
    </Carousel>
  )
}
