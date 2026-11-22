<script lang="ts">
  import { Button, Field, SelectButton } from "opui-css/svelte"

  let fruit = $state("apples")
</script>

<Field for="select-binding-1" label="Fruit">
  <select bind:value={fruit} id="select-binding-1" name="select-binding">
    <SelectButton />
    <option value="apples">Apples</option>
    <option value="bananas">Bananas</option>
    <option value="cherries">Cherries</option>
  </select>
</Field>
<p class="select-binding-text">Selected: {fruit}</p>
<Button class="select-binding-reset" onclick={() => (fruit = "apples")}
  >Reset</Button
>
