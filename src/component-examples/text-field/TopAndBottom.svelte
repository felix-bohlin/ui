<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField label="Name" placeholder="Holly Humbucker">
  {#snippet top()}Shown on your profile{/snippet}
</TextField>

<TextField
  characterCount
  label="Bass motto"
  maxlength={80}
  placeholder="Turn it up, not down"
>
  {#snippet bottom()}Plain text, no links{/snippet}
</TextField>
