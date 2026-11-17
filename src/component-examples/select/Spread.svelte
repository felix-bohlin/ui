<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select spread>
  {#snippet label()}Country{/snippet}
  <option value="">-</option>
  <option>Denmark</option>
  <option>Finland</option>
  <option>Iceland</option>
  <option>Norway</option>
  <option>Sweden</option>
</Select>

<Select spread variant="filled">
  {#snippet label()}Language{/snippet}
  {#snippet startText()}Choose your preferred language.{/snippet}
  {#snippet endText()}This affects UI translations.{/snippet}
  <option value="">-</option>
  <option>Danish</option>
  <option>Finnish</option>
  <option>Icelandic</option>
  <option>Norwegian</option>
  <option>Swedish</option>
</Select>

<Select required spread>
  {#snippet label()}Forum{/snippet}
  {#snippet startText()}Posts your question where the right bassists hang out.{/snippet}
  <option value="">-</option>
  <option>Gear Talk</option>
  <option>Ignored Bassists Anonymous</option>
</Select>

<Select disabled spread>
  {#snippet label()}Plan{/snippet}
  {#snippet startText()}A gift from your band, aww.{/snippet}
  <option>Gold</option>
</Select>

<Select error spread>
  {#snippet label()}Payment method{/snippet}
  {#snippet startText()}Bassbook Gold renews on the first of each month.{/snippet}
  {#snippet endText()}This card has expired. Pick another one.{/snippet}
  <option>Visa ending in 4242</option>
  <option>Mastercard ending in 5100</option>
</Select>

<Select spread>
  {#snippet label()}Time zone{/snippet}
  {#snippet startText()}Used for gig and rehearsal reminders.{/snippet}
  {#snippet start()}UTC{/snippet}
  <option>-03:00</option>
  <option>+00:00</option>
  <option>+01:00</option>
  <option>+05:30</option>
  <option>+09:00</option>
</Select>

<Select spread variant="filled">
  {#snippet label()}Jam region{/snippet}
  {#snippet startText()}Less lag means tighter grooves.{/snippet}
  {#snippet start()}
    <svg
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
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M2 12h20"></path>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  {/snippet}
  {#snippet endText()}Cannot be changed mid-jam.{/snippet}
  <option value="">-</option>
  <option>Asia</option>
  <option>Europe</option>
  <option>North America</option>
</Select>
