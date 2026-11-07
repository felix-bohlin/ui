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
      <Switch card checked spread value="outlined">
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Switch>
      <Switch card spread value="tonal" variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Switch>
      <Switch card spread value="elevated" variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Input at the start</FieldLegend>
    <FieldGroup name="switch-cards-start" orientation="horizontal">
      <Switch card checked value="outlined">
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Switch>
      <Switch card value="tonal" variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Switch>
      <Switch card value="elevated" variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
</Form>
