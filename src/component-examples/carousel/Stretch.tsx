import { For } from "solid-js"

import { Card, Carousel } from "opui-css/solid"

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

export default function Example() {
  return (
    <Carousel buttons="outside" label="Destinations" perView={3} stretch>
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
