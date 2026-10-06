import { For } from "solid-js"
import { Card, Carousel } from "opui-css/solid"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]

export default function Example() {
  return (
    <Carousel buttons="outside" label="Destinations" markers>
      <For each={places}>
        {({ description, title }) => (
          <li>
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
        )}
      </For>
    </Carousel>
  )
}
