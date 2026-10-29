<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea
  characterCount
  characterCountLabel={"{count} characters to go"}
  endText="Shown on your profile."
  label="Bio"
  maxlength={160}
/>
