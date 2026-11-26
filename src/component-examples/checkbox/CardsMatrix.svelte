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
    <FieldGroup orientation="horizontal">
      <Checkbox
        card
        defaultChecked
        name="checkbox-cards-end"
        spread
        value="support"
      >
        Priority bass help
        {#snippet endText()}€8 per month{/snippet}
      </Checkbox>
      <Checkbox
        card
        name="checkbox-cards-end"
        spread
        value="storage"
        variant="elevated"
      >
        Extra slap video storage
        {#snippet endText()}€4 per month{/snippet}
      </Checkbox>
      <Checkbox
        card
        name="checkbox-cards-end"
        spread
        value="audit-log"
        variant="tonal"
      >
        Gig diary
        {#snippet endText()}€6 per month{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Email updates</FieldLegend>
    <FieldGroup orientation="horizontal">
      <Checkbox card defaultChecked name="checkbox-cards-start" value="weekly">
        Weekly jam recap
        {#snippet endText()}Every Monday morning.{/snippet}
      </Checkbox>
      <Checkbox
        card
        name="checkbox-cards-start"
        value="usage"
        variant="elevated"
      >
        Gig alerts
        {#snippet endText()}When your band books a gig.{/snippet}
      </Checkbox>
      <Checkbox
        card
        name="checkbox-cards-start"
        value="invoices"
        variant="tonal"
      >
        Gold receipts
        {#snippet endText()}After each payment.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
