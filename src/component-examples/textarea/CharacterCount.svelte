<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea
  characterCount
  characterCountLabel={"{count} characters to go"}
  endText="Up to 160 characters, shown on your profile."
  label="Bio"
  maxlength={160}
/>
