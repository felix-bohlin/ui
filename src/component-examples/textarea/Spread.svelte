<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea placeholder="Hello, world!" spread>
  {#snippet label()}Message{/snippet}
  {#snippet startText()}You can write your message here. Keep it short,
    preferably under 100 characters.{/snippet}
</Textarea>

<Textarea placeholder="Additional notes..." spread variant="filled">
  {#snippet label()}Notes{/snippet}
  {#snippet startText()}Add any additional notes or comments{/snippet}
  {#snippet endText()}Maximum 500 characters{/snippet}
</Textarea>

<Textarea label="Required" required spread>
  {#snippet startText()}You must provide a response{/snippet}
</Textarea>

<Textarea disabled label="Disabled" spread>
  {#snippet startText()}This textarea is disabled{/snippet}
</Textarea>

<Textarea error label="Invalid Message" spread>
  {#snippet startText()}This textarea has an error{/snippet}
  {#snippet endText()}This value is too short.{/snippet}
</Textarea>

<Textarea label="Bio" placeholder="Tell us about yourself..." spread>
  {#snippet startText()}Shown on your public profile{/snippet}
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      ></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  {/snippet}
  {#snippet bottom()}280 characters left{/snippet}
</Textarea>

<Textarea
  label="Release notes"
  placeholder="Markdown supported..."
  spread
  variant="filled"
>
  {#snippet startText()}Shown on the changelog page{/snippet}
  {#snippet top()}v1.4.0{/snippet}
  {#snippet bottom()}Saved 2 minutes ago{/snippet}
  {#snippet endText()}Drafts are auto-saved{/snippet}
</Textarea>
