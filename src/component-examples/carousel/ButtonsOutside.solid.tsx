/** @jsxImportSource @solidjs/web */
import { Card, Carousel } from "opui-css/solid"

const slides = [1, 2, 3, 4]

export default function ButtonsOutside() {
  return (
    <Carousel aria-label="Destinations" buttons="outside" itemsPerView={2}>
      {slides.map(() => (
        <li>
          <Card style="block-size: 8rem" variant="tonal" />
        </li>
      ))}
    </Carousel>
  )
}
