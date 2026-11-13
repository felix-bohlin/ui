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
      <Radio card defaultChecked spread value="basic">
        Basic
        {#snippet endText()}€0 per month, forever{/snippet}
      </Radio>
      <Radio card spread value="gold" variant="elevated">
        Gold
        {#snippet endText()}€3 per month, shiny badge included{/snippet}
      </Radio>
      <Radio card spread value="platinum" variant="tonal">
        Platinum
        {#snippet endText()}€5 per month, extra sparkly{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Billing</FieldLegend>
    <FieldGroup name="radio-cards-start" orientation="horizontal">
      <Radio card defaultChecked value="monthly">
        Monthly
        {#snippet endText()}Cancel any time, no hard feelings.{/snippet}
      </Radio>
      <Radio card value="yearly" variant="elevated">
        Yearly
        {#snippet endText()}Two months free, woohoo.{/snippet}
      </Radio>
      <Radio card value="gig-money" variant="tonal">
        Gig money
        {#snippet endText()}Pay in coins after your next gig.{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
</Form>
