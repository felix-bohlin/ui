<script lang="ts">
  import { Rating } from "opui-css/svelte"

  let rating = $state(3)
</script>

<Rating bind:value={rating} label="Your rating" name="review" />
