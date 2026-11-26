<script lang="ts">
  import { Card, Carousel } from "opui-css/svelte"

  const slides = [1, 2, 3, 4]
</script>

<Carousel aria-label="Plans" buttons="outside" itemsPerView={2}>
  {#each slides as slide (slide)}
    <li>
      <Card style="block-size: 8rem" variant="outlined" />
    </li>
  {/each}
</Carousel>
