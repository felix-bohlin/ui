<script lang="ts">
  import { Button, Select } from "opui-css/svelte"

  let fruit = $state("apples")
</script>

<Select
  label="Fruit"
  name="select-binding"
  items={[
    { label: "Apples", value: "apples" },
    { label: "Bananas", value: "bananas" },
    { label: "Cherries", value: "cherries" },
  ]}
  bind:value={fruit}
/>
<p class="select-binding-text">Selected: {fruit}</p>
<Button class="select-binding-reset" onclick={() => (fruit = "apples")}
  >Reset</Button
>
