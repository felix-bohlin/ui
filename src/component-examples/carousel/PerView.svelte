<script lang="ts">
  import { Card, CardHeader, Carousel } from "opui-css/svelte"

  const places = [
    { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
    { description: "Ceviche by the Pacific.", title: "Lima" },
    { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
    { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
    { description: "Medina markets and Mediterranean light.", title: "Tunis" },
  ]
</script>

<Carousel aria-label="Destinations" buttons="outside" perView={3}>
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
