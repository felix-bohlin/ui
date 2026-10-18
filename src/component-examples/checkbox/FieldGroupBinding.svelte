<script lang="ts">
  import {
    Button,
    Checkbox,
    FieldGroup,
    FieldLegend,
    FieldSet,
  } from "opui-css/svelte"

  let fruit = $state(["apples"])

  function reset() {
    fruit = ["apples"]
  }
</script>

<FieldSet>
  <FieldLegend>Fruit</FieldLegend>
  <FieldGroup name="checkbox-binding">
    <Checkbox bind:group={fruit} value="apples">Apples</Checkbox>
    <Checkbox bind:group={fruit} value="bananas">Bananas</Checkbox>
    <Checkbox bind:group={fruit} value="cherries">Cherries</Checkbox>
  </FieldGroup>
</FieldSet>
<p class="checkbox-binding-text">Selected: {fruit.join(", ") || "none"}</p>
<Button class="checkbox-binding-reset" onclick={reset}>Reset</Button>
