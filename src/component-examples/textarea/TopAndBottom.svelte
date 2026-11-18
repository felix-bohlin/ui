<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea label="Code" placeholder="console.log('Hello, world!')">
  {#snippet top()}script.js{/snippet}
</Textarea>

<Textarea
  characterCount
  label="Comment"
  maxlength={280}
  placeholder="Write a comment..."
>
  {#snippet bottom()}Markdown supported{/snippet}
</Textarea>
