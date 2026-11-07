<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Radio,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Delivery</FieldLegend>
    <FieldGroup name="radio-spread">
      <Radio checked spread value="standard">
        Standard
        {#snippet endText()}Arrives in 3 to 5 days.{/snippet}
      </Radio>
      <Radio spread value="express">
        Express
        {#snippet endText()}Arrives tomorrow.{/snippet}
      </Radio>
      <Radio disabled spread value="pickup">
        Pickup
        {#snippet endText()}Not available in your area.{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
</Form>
