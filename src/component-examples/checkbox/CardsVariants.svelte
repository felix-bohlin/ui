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
    <FieldLegend>Variants</FieldLegend>
    <FieldGroup name="checkbox-cards-variants" orientation="horizontal">
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
</Form>
