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
    <FieldLegend>Plan</FieldLegend>
    <FieldGroup name="radio-cards-end" orientation="horizontal">
      <Radio card defaultChecked spread value="starter">
        Starter
        {#snippet endText()}€0 per month{/snippet}
      </Radio>
      <Radio card spread value="team" variant="elevated">
        Team
        {#snippet endText()}€12 per person per month{/snippet}
      </Radio>
      <Radio card spread value="business" variant="tonal">
        Business
        {#snippet endText()}€24 per person per month{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Billing</FieldLegend>
    <FieldGroup name="radio-cards-start" orientation="horizontal">
      <Radio card defaultChecked value="monthly">
        Monthly
        {#snippet endText()}Cancel at any time.{/snippet}
      </Radio>
      <Radio card value="yearly" variant="elevated">
        Yearly
        {#snippet endText()}Two months free.{/snippet}
      </Radio>
      <Radio card value="invoice" variant="tonal">
        Invoice
        {#snippet endText()}Pay by bank transfer.{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
</Form>
