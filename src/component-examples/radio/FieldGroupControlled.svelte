<script lang="ts">
  import {
    Button,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Radio,
  } from "opui-css/svelte"

  let shipping = $state("standard")
</script>

<Fieldset>
  <FieldLegend>Shipping</FieldLegend>
  <FieldGroup name="radio-controlled">
    <Radio
      checked={shipping === "standard"}
      onchange={() => (shipping = "standard")}
      value="standard"
    >
      Standard
    </Radio>
    <Radio
      checked={shipping === "express"}
      onchange={() => (shipping = "express")}
      value="express"
    >
      Express
    </Radio>
    <Radio
      checked={shipping === "pickup"}
      onchange={() => (shipping = "pickup")}
      value="pickup"
    >
      Pickup
    </Radio>
  </FieldGroup>
</Fieldset>
<p class="radio-controlled-text">Selected: {shipping}</p>
<Button class="radio-controlled-reset" onclick={() => (shipping = "standard")}>
  Reset
</Button>
