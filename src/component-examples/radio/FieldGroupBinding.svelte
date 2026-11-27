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
  <FieldGroup>
    <Radio bind:group={plan} name="radio-binding" value="basic">Basic</Radio>
    <Radio bind:group={plan} name="radio-binding" value="gold">Gold</Radio>
    <Radio bind:group={plan} name="radio-binding" value="platinum"
      >Platinum</Radio
    >
  </FieldGroup>
</Fieldset>
<p class="radio-binding-text">Selected: {plan}</p>
<Button class="radio-binding-reset" onclick={reset}>Reset</Button>
