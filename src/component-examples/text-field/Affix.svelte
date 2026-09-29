<script lang="ts">
  import { TextField } from "@opui/svelte"
</script>

<TextField label="Amount" placeholder="0.00" prefix="¢" suffix="EUR" />

<TextField label="Website" placeholder="example.com" prefix="https://" />

<TextField label="Weight" type="numeric" placeholder="0" suffix="kg" />

<TextField label="Search" placeholder="Search...">
  {#snippet prefix()}
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  {/snippet}
</TextField>
