<script lang="ts">
  import { Textarea } from "@opui/svelte"
</script>

<Textarea spread placeholder="Hello, world!">
  {#snippet label()}Message{/snippet}
  {#snippet description()}
    >You can write your message here. Keep it short, preferably under 100
    characters.{/snippet}
</Textarea>

<Textarea spread placeholder="Additional notes..." filled>
  {#snippet label()}Notes{/snippet}
  {#snippet description()}Add any additional notes or comments{/snippet}
  {#snippet endText()}Maximum 500 characters{/snippet}
</Textarea>

<Textarea spread required label="Required">
  {#snippet description()}You must provide a response{/snippet}
</Textarea>

<Textarea spread disabled label="Disabled">
  {#snippet description()}This textarea is disabled{/snippet}
</Textarea>

<Textarea spread critical label="Invalid Message">
  {#snippet description()}This textarea has an error{/snippet}
  {#snippet endText()}This value is too short.{/snippet}
</Textarea>

<Textarea spread label="Bio" placeholder="Tell us about yourself...">
  {#snippet description()}Shown on your public profile{/snippet}
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      ></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  {/snippet}
  {#snippet footer()}280 characters left{/snippet}
</Textarea>

<Textarea
  spread
  filled
  label="Release notes"
  placeholder="Markdown supported..."
>
  {#snippet description()}Shown on the changelog page{/snippet}
  {#snippet header()}v1.4.0{/snippet}
  {#snippet footer()}Saved 2 minutes ago{/snippet}
  {#snippet endText()}Drafts are auto-saved{/snippet}
</Textarea>
