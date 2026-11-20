<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField for="text-field-spread-1" spread>
  <input
    aria-describedby="text-field-spread-1-start-text"
    id="text-field-spread-1"
    placeholder="Holly Humbucker"
  />
  {#snippet label()}Name{/snippet}
  {#snippet startText()}Your full name, as the drummer never says it{/snippet}
</TextField>

<TextField for="text-field-spread-2" spread variant="filled">
  <input
    aria-describedby="text-field-spread-2-start-text text-field-spread-2-end-text"
    id="text-field-spread-2"
    placeholder="name@lowend.example"
    type="email"
  />
  {#snippet label()}Email{/snippet}
  {#snippet startText()}We'll send your gig invites here{/snippet}
  {#snippet endText()}Use one the band checks.{/snippet}
</TextField>

<TextField for="text-field-spread-3" label="Band" spread>
  <input
    aria-describedby="text-field-spread-3-start-text"
    id="text-field-spread-3"
    required
  />
  {#snippet startText()}Shown on your gig flyers{/snippet}
</TextField>

<TextField for="text-field-spread-4" label="Member ID" spread>
  <input
    aria-describedby="text-field-spread-4-start-text"
    disabled
    id="text-field-spread-4"
    value="BASS-20931"
  />
  {#snippet startText()}Assigned when you joined Bassbook{/snippet}
</TextField>

<TextField for="text-field-spread-5" label="Display name" spread>
  <input
    aria-describedby="text-field-spread-5-start-text text-field-spread-5-end-text"
    aria-invalid="true"
    id="text-field-spread-5"
    value="A"
  />
  {#snippet startText()}Shown next to your wall posts{/snippet}
  {#snippet endText()}Enter at least two characters.{/snippet}
</TextField>

<TextField for="text-field-spread-6" label="Amount" spread>
  <input
    aria-describedby="text-field-spread-6-start-text text-field-spread-6-start text-field-spread-6-end"
    id="text-field-spread-6"
    placeholder="0.00"
  />
  {#snippet startText()}Daily gear spending limit{/snippet}
  {#snippet start()}€{/snippet}
  {#snippet end()}EUR{/snippet}
</TextField>

<TextField for="text-field-spread-7" label="Website" spread variant="filled">
  <input
    aria-describedby="text-field-spread-7-start-text text-field-spread-7-start text-field-spread-7-end-text"
    id="text-field-spread-7"
    placeholder="example.com"
  />
  {#snippet startText()}Your band homepage, totally rad{/snippet}
  {#snippet start()}https://{/snippet}
  {#snippet endText()}Include the domain, like example.com.{/snippet}
</TextField>

<TextField for="text-field-spread-8" label="Band page" spread>
  <input
    aria-describedby="text-field-spread-8-start-text text-field-spread-8-top text-field-spread-8-bottom"
    id="text-field-spread-8"
    placeholder="my-band"
  />
  {#snippet startText()}Used to make your band page URL{/snippet}
  {#snippet top()}bassbook.example/{/snippet}
  {#snippet bottom()}Lowercase letters and dashes only{/snippet}
</TextField>

<TextField
  for="text-field-spread-9"
  label="Secret riff"
  spread
  variant="filled"
>
  <input
    aria-describedby="text-field-spread-9-start-text text-field-spread-9-top text-field-spread-9-start text-field-spread-9-bottom text-field-spread-9-end-text"
    id="text-field-spread-9"
    placeholder="Paste your riff"
    type="password"
  />
  {#snippet startText()}Locked away from guitarists{/snippet}
  {#snippet start()}
    <svg
      data-icon="lock"
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  {/snippet}
  {#snippet top()}Secret{/snippet}
  {#snippet bottom()}Changes every 90 days{/snippet}
  {#snippet endText()}Never show it to the drummer.{/snippet}
</TextField>
