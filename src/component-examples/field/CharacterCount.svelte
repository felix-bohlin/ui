<script lang="ts">
  import { CharacterCount, Field } from "opui-css/svelte"
</script>

<Field for="field-character-count-1" label="Headline">
  <input
    aria-describedby="field-character-count-1-end-text"
    id="field-character-count-1"
    maxlength="60"
    name="headline"
  />
  {#snippet endText()}
    Up to 60 characters.
    <CharacterCount label={"{count} characters left"} />
  {/snippet}
</Field>
