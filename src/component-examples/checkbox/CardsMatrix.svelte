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
    <FieldLegend>Input at the end</FieldLegend>
    <FieldGroup name="checkbox-cards-end" orientation="horizontal">
      <Checkbox card checked spread value="outlined">
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Checkbox>
      <Checkbox card spread value="tonal" variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Checkbox>
      <Checkbox card spread value="elevated" variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Input at the start</FieldLegend>
    <FieldGroup name="checkbox-cards-start" orientation="horizontal">
      <Checkbox card checked value="outlined">
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Checkbox>
      <Checkbox card value="tonal" variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Checkbox>
      <Checkbox card value="elevated" variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
