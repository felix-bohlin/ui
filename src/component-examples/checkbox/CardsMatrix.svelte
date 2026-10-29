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
      <Checkbox value="outlined" checked card spread>
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Checkbox>
      <Checkbox value="tonal" card variant="tonal" spread>
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Checkbox>
      <Checkbox value="elevated" card variant="elevated" spread>
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Input at the start</FieldLegend>
    <FieldGroup name="checkbox-cards-start" orientation="horizontal">
      <Checkbox value="outlined" checked card>
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Checkbox>
      <Checkbox value="tonal" card variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Checkbox>
      <Checkbox value="elevated" card variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
