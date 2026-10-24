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
      <Radio value="outlined" checked card spread>
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Radio>
      <Radio value="tonal" card variant="tonal" spread>
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Radio>
      <Radio value="elevated" card variant="elevated" spread>
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Input at the start</FieldLegend>
    <FieldGroup name="radio-cards-start" orientation="horizontal">
      <Radio value="outlined" checked card>
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Radio>
      <Radio value="tonal" card variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Radio>
      <Radio value="elevated" card variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Radio>
    </FieldGroup>
  </Fieldset>
</Form>
