<script lang="ts">
  import { Card, Carousel } from "opui-css/svelte"

  const slides = [1, 2, 3, 4]
</script>

<Carousel
  aria-label="Destinations"
  buttons="outside"
  itemsPerView={2}
  persistentButtons
>
  {#each slides as slide (slide)}
    <li>
      <Card style="block-size: 8rem" variant="tonal" />
    </li>
  {/each}
</Carousel>
