<script>
  import { Card } from "@opui/svelte"
</script>

<Card variant="outlined">
  {#snippet header()}
    <p>Blog</p>
    <h3>My ultra-great blog post</h3>
    <p>Please read it.</p>
  {/snippet}
</Card>
