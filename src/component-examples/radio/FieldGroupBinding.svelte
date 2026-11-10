<script lang="ts">
  import {
    Button,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Radio,
  } from "opui-css/svelte"

  let plan = $state("starter")

  function reset() {
    plan = "starter"
  }
</script>

<Fieldset>
  <FieldLegend>Plan</FieldLegend>
  <FieldGroup name="radio-binding">
    <Radio bind:group={plan} value="starter">Starter</Radio>
    <Radio bind:group={plan} value="team">Team</Radio>
    <Radio bind:group={plan} value="business">Business</Radio>
  </FieldGroup>
</Fieldset>
<p class="radio-binding-text">Selected: {plan}</p>
<Button class="radio-binding-reset" onclick={reset}>Reset</Button>
