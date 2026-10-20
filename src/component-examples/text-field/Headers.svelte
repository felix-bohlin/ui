<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField label="Name" placeholder="Ada Lovelace">
  {#snippet header()}Shown on your profile{/snippet}
</TextField>

<TextField label="Tagline" placeholder="A short description">
  {#snippet footer()}0 / 80{/snippet}
</TextField>
