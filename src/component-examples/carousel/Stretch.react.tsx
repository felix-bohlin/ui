import { Card, CardHeader, Carousel } from "opui-css/react"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  {
    description:
      "Ceviche by the Pacific, colonial plazas and clifftop parks above the ocean.",
    title: "Lima",
  },
  { description: "Tiles and trams.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets.", title: "Tunis" },
]

export default function Stretch() {
  return (
    <Carousel
      aria-label="Destinations"
      buttons="outside"
      itemsPerView={3}
      stretch
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
