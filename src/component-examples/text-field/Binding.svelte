<script lang="ts">
  import { Button, TextField } from "opui-css/svelte"

  let name = $state("Ada")
</script>

<TextField label="Name" name="text-field-binding" bind:value={name} />
<p class="text-field-binding-text">Hello, {name || "stranger"}.</p>
<Button class="text-field-binding-reset" onclick={() => (name = "Ada")}
  >Reset</Button
>
