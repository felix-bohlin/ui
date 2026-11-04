<script lang="ts">
  import { Card, CardHeader, Carousel } from "opui-css/svelte"

  const places = [
    { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
    { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
    { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
    { description: "Medina markets and Mediterranean light.", title: "Tunis" },
  ]
</script>

<Carousel
  aria-label="Destinations"
  buttons="outside"
  itemsPerView={2}
  persistentButtons
>
  {#each places as { description, title } (title)}
    <li>
      <Card variant="tonal">
        <CardHeader>
          <p>Destination</p>
          <h3>{title}</h3>
          <p>{description}</p>
        </CardHeader>
      </Card>
    </li>
  {/each}
</Carousel>
