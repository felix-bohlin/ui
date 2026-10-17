import { Card, CardHeader, Carousel } from "opui-css/react"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]

export default function PersistentButtons() {
  return (
    <Carousel
      buttons="outside"
      aria-label="Destinations"
      perView={2}
      persistentButtons
    >
      {places.map(({ description, title }) => (
        <li key={title}>
          <Card variant="tonal">
            <CardHeader>
              <p>Destination</p>
              <h3>{title}</h3>
              <p>{description}</p>
            </CardHeader>
          </Card>
        </li>
      ))}
    </Carousel>
  )
}
