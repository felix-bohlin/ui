<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField placeholder="Holly Humbucker" spread>
  {#snippet label()}Name{/snippet}
  {#snippet startText()}Your full name, as the drummer never says it{/snippet}
</TextField>

<TextField
  placeholder="name@lowend.example"
  spread
  type="email"
  variant="filled"
>
  {#snippet label()}Email{/snippet}
  {#snippet startText()}We'll send your gig invites here{/snippet}
  {#snippet endText()}Use one the band checks.{/snippet}
</TextField>

<TextField label="Band" required spread>
  {#snippet startText()}Shown on your gig flyers{/snippet}
</TextField>

<TextField disabled label="Member ID" spread value="BASS-20931">
  {#snippet startText()}Assigned when you joined Bassbook{/snippet}
</TextField>

<TextField error label="Display name" spread value="A">
  {#snippet startText()}Shown next to your wall posts{/snippet}
  {#snippet endText()}Enter at least two characters.{/snippet}
</TextField>

<TextField label="Amount" placeholder="0.00" spread>
  {#snippet startText()}Daily gear spending limit{/snippet}
  {#snippet start()}€{/snippet}
  {#snippet end()}EUR{/snippet}
</TextField>

<TextField label="Website" placeholder="example.com" spread variant="filled">
  {#snippet startText()}Your band homepage, totally rad{/snippet}
  {#snippet start()}https://{/snippet}
  {#snippet endText()}Include the domain, like example.com.{/snippet}
</TextField>

<TextField label="Band page" placeholder="my-band" spread>
  {#snippet startText()}Used to make your band page URL{/snippet}
  {#snippet top()}bassbook.example/{/snippet}
  {#snippet bottom()}Lowercase letters and dashes only{/snippet}
</TextField>

<TextField
  label="Secret riff"
  placeholder="Paste your riff"
  spread
  type="password"
  variant="filled"
>
  {#snippet startText()}Locked away from guitarists{/snippet}
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  {/snippet}
  {#snippet top()}Secret{/snippet}
  {#snippet bottom()}Changes every 90 days{/snippet}
  {#snippet endText()}Never show it to the drummer.{/snippet}
</TextField>
