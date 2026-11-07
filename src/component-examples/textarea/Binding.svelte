<script lang="ts">
  import { Button, Textarea } from "opui-css/svelte"

  const initial = "Thanks for the update."
  let message = $state(initial)
</script>

<Textarea label="Message" name="textarea-binding" bind:value={message} />
<p class="textarea-binding-text">{message.length} characters</p>
<Button class="textarea-binding-reset" onclick={() => (message = initial)}
  >Reset</Button
>
