<script lang="ts">
  import {
    Button,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Radio,
  } from "opui-css/svelte"

  let plan = $state("basic")

  function reset() {
    plan = "basic"
  }
</script>

<Fieldset>
  <FieldLegend>Plan</FieldLegend>
  <FieldGroup name="radio-binding">
    <Radio bind:group={plan} value="basic">Basic</Radio>
    <Radio bind:group={plan} value="gold">Gold</Radio>
    <Radio bind:group={plan} value="platinum">Platinum</Radio>
  </FieldGroup>
</Fieldset>
<p class="radio-binding-text">Selected: {plan}</p>
<Button class="radio-binding-reset" onclick={reset}>Reset</Button>
