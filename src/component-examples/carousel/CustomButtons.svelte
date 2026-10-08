<script lang="ts">
  import { Card, Carousel } from "opui-css/svelte"

  const places = [
    { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
    { description: "Ceviche by the Pacific.", title: "Lima" },
    { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
    { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
    { description: "Medina markets and Mediterranean light.", title: "Tunis" },
  ]
</script>

<Carousel
  buttons="outside"
  class="carousel-custom-buttons"
  label="Destinations"
  perView={2}
>
  {#each places as { description, title } (title)}
    <li>
      <Card variant="tonal">
        {#snippet header()}
          <p>Destination</p>
          <h3>{title}</h3>
          <p>{description}</p>
        {/snippet}
      </Card>
    </li>
  {/each}
</Carousel>

<style>
  :global {
    .carousel-custom-buttons {
      --_button-bg-color: var(--primary);
      --_button-next-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-6-6 6 6-6 6'/%3E%3C/svg%3E");
      --_button-prev-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 12H5m6-6-6 6 6 6'/%3E%3C/svg%3E");
    }
  }
</style>
