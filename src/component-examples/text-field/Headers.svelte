<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField label="Username" placeholder="Enter your name">
  {#snippet header()}Full Name{/snippet}
</TextField>

<TextField label="Tagline" placeholder="A short description">
  {#snippet footer()}0 / 80{/snippet}
</TextField>
