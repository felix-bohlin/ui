<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea label="Code" placeholder="console.log('Hello, world!')">
  {#snippet top()}script.js{/snippet}
</Textarea>

<Textarea label="Comment" placeholder="Write a comment...">
  {#snippet bottom()}0 / 280{/snippet}
</Textarea>
