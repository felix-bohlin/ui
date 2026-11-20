<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea for="textarea-affix-1" label="Notes">
  <textarea
    aria-describedby="textarea-affix-1-start"
    id="textarea-affix-1"
    placeholder="Add a note..."></textarea>
  {#snippet start()}
    <svg
      data-icon="edit"
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
</Textarea>

<Textarea for="textarea-affix-2" label="Comment">
  <textarea
    aria-describedby="textarea-affix-2-end"
    id="textarea-affix-2"
    placeholder="Write a comment..."></textarea>
  {#snippet end()}Markdown{/snippet}
</Textarea>
