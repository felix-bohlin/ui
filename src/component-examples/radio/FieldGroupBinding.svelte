<script lang="ts">
  import {
    Button,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Radio,
  } from "opui-css/svelte"

  let plan = $state("free")

  function reset() {
    plan = "free"
  }
</script>

<FieldSet>
  <FieldLegend>Plan</FieldLegend>
  <FieldGroup name="radio-binding">
    <Radio bind:group={plan} value="free">Free</Radio>
    <Radio bind:group={plan} value="pro">Pro</Radio>
    <Radio bind:group={plan} value="team">Team</Radio>
  </FieldGroup>
</FieldSet>
<p class="radio-binding-text">Selected: {plan}</p>
<Button class="radio-binding-reset" onclick={reset}>Reset</Button>
