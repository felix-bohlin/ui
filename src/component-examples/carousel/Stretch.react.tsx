import { Card, Carousel } from "opui-css/react"

export default function Stretch() {
  return (
    <Carousel
      aria-label="Destinations"
      buttons="outside"
      itemsPerView={3}
      stretch
    >
      <li>
        <Card style={{ minBlockSize: "6rem" }} variant="tonal" />
      </li>
      <li>
        <Card style={{ minBlockSize: "10rem" }} variant="tonal" />
      </li>
      <li>
        <Card style={{ minBlockSize: "4rem" }} variant="tonal" />
      </li>
      <li>
        <Card style={{ minBlockSize: "8rem" }} variant="tonal" />
      </li>
      <li>
        <Card style={{ minBlockSize: "5rem" }} variant="tonal" />
      </li>
    </Carousel>
  )
}
