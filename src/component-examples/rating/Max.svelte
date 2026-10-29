<script lang="ts">
  import { Rating } from "opui-css/svelte"
</script>

<Rating label="Rated 2 out of 3" max={3} value={2} />
<Rating label="Rated 7.5 out of 10" max={10} value={7.5} />
<Rating label="Difficulty" max={3} name="difficulty" value={2} />
