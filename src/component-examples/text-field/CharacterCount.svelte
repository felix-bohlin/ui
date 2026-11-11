<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField
  characterCount
  endText="Up to 20 letters, numbers and dashes."
  label="Username"
  maxlength={20}
/>
