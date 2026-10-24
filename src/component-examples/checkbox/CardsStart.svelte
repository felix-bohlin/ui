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
    <FieldGroup name="checkbox-cards-start">
      <Checkbox value="support" checked card>
        Priority support
        {#snippet endText()}Answers within a day.{/snippet}
      </Checkbox>
      <Checkbox value="storage" card>
        Extra storage
        {#snippet endText()}Another 100 GB.{/snippet}
      </Checkbox>
      <Checkbox value="domain" disabled card>
        Custom domain
        {#snippet endText()}Not available on this plan.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
