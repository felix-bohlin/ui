<script lang="ts">
  import {
    Checkbox,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Add-ons</FieldLegend>
    <FieldGroup name="checkbox-cards-end" orientation="horizontal">
      <Checkbox card defaultChecked spread value="support">
        Priority support
        {#snippet endText()}€8 per month{/snippet}
      </Checkbox>
      <Checkbox card spread value="storage" variant="elevated">
        Extra storage
        {#snippet endText()}€4 per month{/snippet}
      </Checkbox>
      <Checkbox card spread value="audit-log" variant="tonal">
        Audit log
        {#snippet endText()}€6 per month{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Email reports</FieldLegend>
    <FieldGroup name="checkbox-cards-start" orientation="horizontal">
      <Checkbox card defaultChecked value="weekly">
        Weekly summary
        {#snippet endText()}Every Monday morning.{/snippet}
      </Checkbox>
      <Checkbox card value="usage" variant="elevated">
        Usage alerts
        {#snippet endText()}At 80% of your plan.{/snippet}
      </Checkbox>
      <Checkbox card value="invoices" variant="tonal">
        Invoices
        {#snippet endText()}After each payment.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
