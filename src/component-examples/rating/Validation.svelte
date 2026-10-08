<script lang="ts">
  import { Rating } from "opui-css/svelte"
</script>

<Rating
  aria-describedby="stay-error"
  error
  label="Rate your stay"
  name="stay"
  required
/>
<p class="ui-caption" id="stay-error">Pick a rating to continue.</p>
