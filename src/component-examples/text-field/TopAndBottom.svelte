<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField label="Name" placeholder="Ada Lovelace">
  {#snippet top()}Shown on your profile{/snippet}
</TextField>

<TextField label="Tagline" placeholder="A short description">
  {#snippet bottom()}0 / 80{/snippet}
</TextField>
