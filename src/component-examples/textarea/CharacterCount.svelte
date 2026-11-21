<script lang="ts">
  import { CharacterCount, Field } from "opui-css/svelte"
</script>

<Field for="textarea-character-count-1" label="Bio">
  <textarea
    aria-describedby="textarea-character-count-1-end-text"
    id="textarea-character-count-1"
    maxlength="160"></textarea>
  {#snippet endText()}
    Up to 160 characters, shown on your profile.
    <CharacterCount label={"{count} characters to go"} />
  {/snippet}
</Field>
