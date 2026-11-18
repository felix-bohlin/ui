<script lang="ts">
  import { Card, Carousel } from "opui-css/svelte"

  const slides = [1, 2, 3, 4, 5]
</script>

<Carousel
  aria-label="Destinations"
  itemsPerView={2}
  markers
  orientation="vertical"
  stretch
  style="--_block-size: 16rem"
>
  {#each slides as slide (slide)}
    <li>
      <Card variant="tonal" />
    </li>
  {/each}
</Carousel>
