import { Card, Carousel } from "opui-css/react"

const slides = [1, 2, 3, 4, 5]

export default function CustomButtons() {
  return (
    <>
      <Carousel
        aria-label="Destinations"
        buttons="outside"
        className="carousel-custom-buttons"
        itemsPerView={2}
      >
        {slides.map((slide) => (
          <li key={slide}>
            <Card style={{ blockSize: "8rem" }} variant="tonal" />
          </li>
        ))}
      </Carousel>
      <style>{`
        .carousel-custom-buttons {
          --_button-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-6-6 6 6-6 6'/%3E%3C/svg%3E");
        }
      `}</style>
    </>
  )
}
