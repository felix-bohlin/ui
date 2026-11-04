<script lang="ts">
  import { Rating } from "opui-css/svelte"
</script>

<Rating
  aria-describedby="rating-validation-1"
  error
  label="Rate your stay"
  name="stay"
  required
/>
<p class="ui-caption" id="rating-validation-1">Pick a rating to continue.</p>
