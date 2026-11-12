<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField label="Name" placeholder="Hakki Hälinen">
  {#snippet top()}Shown on your profile{/snippet}
</TextField>

<TextField
  characterCount
  label="Tagline"
  maxlength={80}
  placeholder="A short description"
>
  {#snippet bottom()}Plain text, no links{/snippet}
</TextField>
