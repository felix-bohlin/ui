import { Card, Carousel } from "opui-css/react"

const slides = [1, 2, 3, 4]

export default function PersistentButtons() {
  return (
    <Carousel
      aria-label="Destinations"
      buttons="outside"
      itemsPerView={2}
      persistentButtons
    >
      {slides.map((slide) => (
        <li key={slide}>
          <Card style={{ blockSize: "8rem" }} variant="tonal" />
        </li>
      ))}
    </Carousel>
  )
}
