<script lang="ts">
  import { TextField } from "@opui/svelte"
</script>

<TextField spread placeholder="Evil Rabbit">
  {#snippet label()}Name{/snippet}
  {#snippet description()}
    >Provide your full name for identification{/snippet}
</TextField>

<TextField spread placeholder="you@example.com" type="email" filled>
  {#snippet label()}Email{/snippet}
  {#snippet description()}We'll use this to contact you{/snippet}
  {#snippet endText()}Please use a valid email address{/snippet}
</TextField>

<TextField spread required label="Required">
  {#snippet description()}You must fill this in{/snippet}
</TextField>

<TextField spread disabled label="Disabled">
  {#snippet description()}This field is disabled{/snippet}
</TextField>

<TextField spread critical label="Invalid Name">
  {#snippet description()}This field has an error{/snippet}
  {#snippet endText()}This value is too short.{/snippet}
</TextField>

<TextField spread label="Amount" placeholder="0.00">
  {#snippet description()}Daily spending limit{/snippet}
  {#snippet prefix()}¢{/snippet}
  {#snippet suffix()}EUR{/snippet}
</TextField>

<TextField spread label="Website" placeholder="example.com" filled>
  {#snippet description()}Your public profile URL{/snippet}
  {#snippet prefix()}https://{/snippet}
  {#snippet endText()}Must include a valid domain{/snippet}
</TextField>

<TextField spread label="Project name" placeholder="my-project">
  {#snippet description()}Used to generate the project URL{/snippet}
  {#snippet header()}acme.dev/{/snippet}
  {#snippet footer()}Lowercase letters and dashes only{/snippet}
</TextField>

<TextField
  spread
  filled
  label="API key"
  placeholder="Paste your key"
  type="password"
>
  {#snippet description()}Stored encrypted at rest{/snippet}
  {#snippet prefix()}
    <svg>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  {/snippet}
  {#snippet header()}Secret{/snippet}
  {#snippet footer()}Rotates every 90 days{/snippet}
  {#snippet endText()}Treat like a password{/snippet}
</TextField>
