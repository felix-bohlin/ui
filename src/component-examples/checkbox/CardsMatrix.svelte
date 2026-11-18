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
    <FieldLegend>Gold add-ons</FieldLegend>
    <FieldGroup name="checkbox-cards-end" orientation="horizontal">
      <Checkbox card defaultChecked spread value="support">
        Priority bass help
        {#snippet endText()}€8 per month{/snippet}
      </Checkbox>
      <Checkbox card spread value="storage" variant="elevated">
        Extra slap video storage
        {#snippet endText()}€4 per month{/snippet}
      </Checkbox>
      <Checkbox card spread value="audit-log" variant="tonal">
        Gig diary
        {#snippet endText()}€6 per month{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Email updates</FieldLegend>
    <FieldGroup name="checkbox-cards-start" orientation="horizontal">
      <Checkbox card defaultChecked value="weekly">
        Weekly jam recap
        {#snippet endText()}Every Monday morning.{/snippet}
      </Checkbox>
      <Checkbox card value="usage" variant="elevated">
        Gig alerts
        {#snippet endText()}When your band books a gig.{/snippet}
      </Checkbox>
      <Checkbox card value="invoices" variant="tonal">
        Gold receipts
        {#snippet endText()}After each payment.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
