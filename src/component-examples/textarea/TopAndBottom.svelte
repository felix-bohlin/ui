<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea for="textarea-top-and-bottom-1" label="Code">
  <textarea
    aria-describedby="textarea-top-and-bottom-1-top"
    id="textarea-top-and-bottom-1"
    placeholder="console.log('Hello, world!')"></textarea>
  {#snippet top()}script.js{/snippet}
</Textarea>

<Textarea characterCount for="textarea-top-and-bottom-2" label="Comment">
  <textarea
    aria-describedby="textarea-top-and-bottom-2-bottom textarea-top-and-bottom-2-end-text"
    id="textarea-top-and-bottom-2"
    maxlength="280"
    placeholder="Write a comment..."></textarea>
  {#snippet bottom()}Markdown supported{/snippet}
</Textarea>
