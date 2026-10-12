import { Card, Carousel } from "opui-css/react"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]

export default function Basics() {
  return (
    <Carousel buttons="outside" label="Destinations" markers>
      {places.map(({ description, title }) => (
        <li key={title}>
          <Card
            variant="tonal"
            header={
              <>
                <p>Destination</p>
                <h3>{title}</h3>
                <p>{description}</p>
              </>
            }
          />
        </li>
      ))}
    </Carousel>
  )
}
