<script lang="ts">
  import { Button, Field } from "opui-css/svelte"

  const initial = "Thanks for the update."
  let message = $state(initial)
</script>

<Field for="textarea-binding-1" label="Message">
  <textarea bind:value={message} id="textarea-binding-1" name="textarea-binding"
  ></textarea>
</Field>
<p class="textarea-binding-text">{message.length} characters</p>
<Button class="textarea-binding-reset" onclick={() => (message = initial)}
  >Reset</Button
>
