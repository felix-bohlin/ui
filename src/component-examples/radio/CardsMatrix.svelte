<script lang="ts">
  import {
    Radio,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Input at the end</FieldLegend>
    <FieldGroup name="radio-cards-end" orientation="horizontal">
      <Radio card checked spread value="outlined">
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Radio>
      <Radio card spread value="tonal" variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Radio>
      <Radio card spread value="elevated" variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Input at the start</FieldLegend>
    <FieldGroup name="radio-cards-start" orientation="horizontal">
      <Radio card checked value="outlined">
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Radio>
      <Radio card value="tonal" variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Radio>
      <Radio card value="elevated" variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
</Form>
