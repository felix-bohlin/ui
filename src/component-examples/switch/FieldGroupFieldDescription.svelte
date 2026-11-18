<script lang="ts">
  import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset
    aria-describedby="switch-field-group-field-description-1-description"
  >
    <FieldLegend>Email me about</FieldLegend>
    <FieldDescription id="switch-field-group-field-description-1-description"
      >We send at most one email a week.</FieldDescription
    >
    <FieldGroup
      name="switch-group-field-description-1"
      orientation="horizontal"
    >
      <Switch value="news">Product news</Switch>
      <Switch value="tips">Tips</Switch>
      <Switch value="offers">Offers</Switch>
    </FieldGroup>
  </Fieldset>
  <Fieldset
    aria-describedby="switch-field-group-field-description-2-description"
  >
    <FieldLegend>Accessibility</FieldLegend>
    <FieldGroup
      name="switch-group-field-description-2"
      orientation="horizontal"
    >
      <Switch value="reduce-motion">Reduce motion</Switch>
      <Switch value="high-contrast">High contrast</Switch>
      <Switch value="captions">Captions</Switch>
    </FieldGroup>
    <FieldDescription id="switch-field-group-field-description-2-description"
      >These apply on this device only.</FieldDescription
    >
  </Fieldset>
</Form>
