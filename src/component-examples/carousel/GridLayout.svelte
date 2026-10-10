<script lang="ts">
  import { Card, Carousel } from "opui-css/svelte"

  const places = ["Kyoto", "Lima", "Lisbon"]
</script>

<div
  style="display: grid; gap: var(--size-4); grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))"
>
  <div>
    <Carousel label="Destinations" markers>
      {#each places as title (title)}
        <li>
          <Card variant="tonal">
            {#snippet header()}
              <p>Destination</p>
              <h3>{title}</h3>
            {/snippet}
          </Card>
        </li>
      {/each}
    </Carousel>
  </div>
  <hgroup>
    <h3>Spring trips</h3>
    <p>Three cities, two weeks, one carry-on.</p>
  </hgroup>
</div>
