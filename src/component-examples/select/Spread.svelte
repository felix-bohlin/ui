<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select spread>
  {#snippet label()}Country{/snippet}
  {#snippet startText()}Select your country of residence{/snippet}
  <option value="">Select a country</option>
  <option>Denmark</option>
  <option>Finland</option>
  <option>Iceland</option>
  <option>Norway</option>
  <option>Sweden</option>
</Select>

<Select spread variant="filled">
  {#snippet label()}Language{/snippet}
  {#snippet startText()}Choose your preferred language{/snippet}
  {#snippet endText()}This affects UI translations{/snippet}
  <option value="">Select a language</option>
  <option>Danish</option>
  <option>Finnish</option>
  <option>Icelandic</option>
  <option>Norwegian</option>
  <option>Swedish</option>
</Select>

<Select required spread>
  {#snippet label()}Required{/snippet}
  {#snippet startText()}You must select an option{/snippet}
  <option value="">Select an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</Select>

<Select disabled spread>
  {#snippet label()}Disabled{/snippet}
  {#snippet startText()}This select is disabled{/snippet}
  <option>Option 1</option>
</Select>

<Select error spread>
  {#snippet label()}Invalid Select{/snippet}
  {#snippet startText()}This select has an error{/snippet}
  {#snippet endText()}Please select a valid option.{/snippet}
  <option>Option 1</option>
</Select>

<Select spread>
  {#snippet label()}Time zone{/snippet}
  {#snippet startText()}Used for reminders and due dates{/snippet}
  {#snippet start()}UTC{/snippet}
  <option>-03:00</option>
  <option>+00:00</option>
  <option>+01:00</option>
  <option>+05:30</option>
  <option>+09:00</option>
</Select>

<Select spread variant="filled">
  {#snippet label()}Region{/snippet}
  {#snippet startText()}Affects data residency and latency{/snippet}
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
  {#snippet endText()}Cannot be changed after deploy{/snippet}
  <option value="">-</option>
  <option>ap-southeast-1</option>
  <option>eu-north-1</option>
  <option>us-east-1</option>
</Select>
