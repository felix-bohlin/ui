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
    <FieldLegend>Input at the end</FieldLegend>
    <FieldGroup name="switch-cards-end" orientation="horizontal">
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
  <Fieldset>
    <FieldLegend>Input at the start</FieldLegend>
    <FieldGroup name="switch-cards-start" orientation="horizontal">
      <Switch value="outlined" checked card>
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Switch>
      <Switch value="tonal" card variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Switch>
      <Switch value="elevated" card variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
</Form>
