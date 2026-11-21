<script lang="ts">
  import { Field } from "opui-css/svelte"
</script>

<Field for="field-affix-1" label="Amount">
  <input
    aria-describedby="field-affix-1-start field-affix-1-end"
    id="field-affix-1"
    placeholder="0.00"
  />
  {#snippet start()}€{/snippet}
  {#snippet end()}EUR{/snippet}
</Field>

<Field for="field-affix-2" label="Website">
  <input
    aria-describedby="field-affix-2-start"
    id="field-affix-2"
    placeholder="example.com"
  />
  {#snippet start()}https://{/snippet}
</Field>

<Field for="field-affix-3" label="Weight">
  <input
    aria-describedby="field-affix-3-end"
    id="field-affix-3"
    inputmode="decimal"
    placeholder="0"
  />
  {#snippet end()}kg{/snippet}
</Field>

<Field for="field-affix-4" label="Search">
  <input
    aria-describedby="field-affix-4-start"
    id="field-affix-4"
    placeholder="Search..."
  />
  {#snippet start()}
    <svg
      data-icon="search"
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
    </svg>
  {/snippet}
</Field>
