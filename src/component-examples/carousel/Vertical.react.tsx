import { Card, Carousel } from "opui-css/react"

const slides = [1, 2, 3, 4, 5]

export default function Vertical() {
  return (
    <Carousel
      aria-label="Destinations"
      itemsPerView={2}
      markers
      orientation="vertical"
      stretch
      style={{ "--_block-size": "16rem" }}
    >
      {slides.map((slide) => (
        <li key={slide}>
          <Card variant="tonal" />
        </li>
      ))}
    </Carousel>
  )
}
