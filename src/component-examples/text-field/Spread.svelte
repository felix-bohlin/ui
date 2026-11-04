<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField placeholder="Evil Rabbit" spread>
  {#snippet label()}Name{/snippet}
  {#snippet startText()}Provide your full name for identification{/snippet}
</TextField>

<TextField placeholder="you@example.com" spread type="email" variant="filled">
  {#snippet label()}Email{/snippet}
  {#snippet startText()}We'll use this to contact you{/snippet}
  {#snippet endText()}Please use a valid email address{/snippet}
</TextField>

<TextField label="Required" required spread>
  {#snippet startText()}You must fill this in{/snippet}
</TextField>

<TextField disabled label="Disabled" spread>
  {#snippet startText()}This field is disabled{/snippet}
</TextField>

<TextField error label="Invalid Name" spread>
  {#snippet startText()}This field has an error{/snippet}
  {#snippet endText()}Enter at least two characters.{/snippet}
</TextField>

<TextField label="Amount" placeholder="0.00" spread>
  {#snippet startText()}Daily spending limit{/snippet}
  {#snippet start()}€{/snippet}
  {#snippet end()}EUR{/snippet}
</TextField>

<TextField label="Website" placeholder="example.com" spread variant="filled">
  {#snippet startText()}Your public profile URL{/snippet}
  {#snippet start()}https://{/snippet}
  {#snippet endText()}Must include a valid domain{/snippet}
</TextField>

<TextField label="Project name" placeholder="my-project" spread>
  {#snippet startText()}Used to generate the project URL{/snippet}
  {#snippet top()}acme.dev/{/snippet}
  {#snippet bottom()}Lowercase letters and dashes only{/snippet}
</TextField>

<TextField
  label="API key"
  placeholder="Paste your key"
  spread
  type="password"
  variant="filled"
>
  {#snippet startText()}Stored encrypted at rest{/snippet}
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
  {#snippet bottom()}Rotates every 90 days{/snippet}
  {#snippet endText()}Treat like a password{/snippet}
</TextField>
