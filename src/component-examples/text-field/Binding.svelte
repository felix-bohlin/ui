<script lang="ts">
  import { Button, Field } from "opui-css/svelte"

  let name = $state("Holly")
</script>

<Field for="text-field-binding-1" label="Name">
  <input
    id="text-field-binding-1"
    name="text-field-binding"
    bind:value={name}
    defaultValue="Holly"
  />
</Field>
<p class="text-field-binding-text">Heyyy, {name || "stranger"}.</p>
<Button class="text-field-binding-reset" onclick={() => (name = "Holly")}
  >Reset</Button
>
