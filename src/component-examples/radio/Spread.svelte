<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    FieldSet,
    Form,
    Radio,
  } from "opui-css/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Delivery</FieldLegend>
    <FieldGroup name="radio-spread">
      <Radio value="standard" checked spread>
        Standard
        {#snippet endText()}Arrives in 3 to 5 days.{/snippet}
      </Radio>
      <Radio value="express" spread>
        Express
        {#snippet endText()}Arrives tomorrow.{/snippet}
      </Radio>
      <Radio value="pickup" spread disabled>
        Pickup
        {#snippet endText()}Not available in your area.{/snippet}
      </Radio>
    </FieldGroup>
  </FieldSet>
</Form>
