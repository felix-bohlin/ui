<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField label="Amount" placeholder="0.00">
  {#snippet start()}€{/snippet}
  {#snippet end()}EUR{/snippet}
</TextField>

<TextField label="Website" placeholder="example.com">
  {#snippet start()}https://{/snippet}
</TextField>

<TextField label="Weight" placeholder="0" type="numeric">
  {#snippet end()}kg{/snippet}
</TextField>

<TextField label="Search" placeholder="Search...">
  {#snippet start()}<svg
      aria-hidden="true"
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
    </svg>{/snippet}
</TextField>
