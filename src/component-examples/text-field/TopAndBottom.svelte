<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField for="text-field-top-and-bottom-1" label="Name">
  <input
    aria-describedby="text-field-top-and-bottom-1-top"
    id="text-field-top-and-bottom-1"
    placeholder="Holly Humbucker"
  />
  {#snippet top()}Shown on your profile{/snippet}
</TextField>

<TextField characterCount for="text-field-top-and-bottom-2" label="Bass motto">
  <input
    aria-describedby="text-field-top-and-bottom-2-bottom text-field-top-and-bottom-2-end-text"
    id="text-field-top-and-bottom-2"
    maxlength="80"
    placeholder="Turn it up, not down"
  />
  {#snippet bottom()}Plain text, no links{/snippet}
</TextField>
