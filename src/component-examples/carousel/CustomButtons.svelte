<script lang="ts">
  import { Card, Carousel } from "opui-css/svelte"

  const slides = [1, 2, 3, 4, 5]
</script>

<Carousel
  aria-label="Destinations"
  buttons="outside"
  class="carousel-custom-buttons"
  itemsPerView={2}
>
  {#each slides as slide (slide)}
    <li>
      <Card style="block-size: 8rem" variant="tonal" />
    </li>
  {/each}
</Carousel>

<style>
  :global {
    .carousel-custom-buttons {
      --_button-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-6-6 6 6-6 6'/%3E%3C/svg%3E");
    }
  }
</style>
