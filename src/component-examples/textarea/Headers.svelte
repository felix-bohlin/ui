<script lang="ts">
  import { Textarea } from "@opui/svelte"
</script>

<Textarea label="Code" placeholder="console.log('Hello, world!')">
  {#snippet header()}
    script.js
  {/snippet}
</Textarea>

<Textarea label="Comment" placeholder="Write a comment...">
  {#snippet footer()}
    0 / 280
  {/snippet}
</Textarea>
