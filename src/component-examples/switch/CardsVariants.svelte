<script lang="ts">
  import {
    Switch,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Variants</FieldLegend>
    <FieldGroup name="switch-cards-variants" orientation="horizontal">
      <Switch value="outlined" checked card spread>
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Switch>
      <Switch value="tonal" card variant="tonal" spread>
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Switch>
      <Switch value="elevated" card variant="elevated" spread>
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
</Form>
