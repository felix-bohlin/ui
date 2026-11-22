<script lang="ts">
  import { CharacterCount, Field } from "opui-css/svelte"
</script>

<Field for="field-top-and-bottom-1" label="Name">
  <input
    aria-describedby="field-top-and-bottom-1-top"
    id="field-top-and-bottom-1"
    placeholder="Holly Humbucker"
  />
  {#snippet top()}Shown on your profile{/snippet}
</Field>

<Field for="field-top-and-bottom-2" label="Bass motto">
  <input
    aria-describedby="field-top-and-bottom-2-bottom field-top-and-bottom-2-end-text"
    id="field-top-and-bottom-2"
    maxlength="80"
    placeholder="Turn it up, not down"
  />
  {#snippet bottom()}Plain text, no links{/snippet}
  {#snippet endText()}
    Up to 80 characters.
    <CharacterCount />
  {/snippet}
</Field>
