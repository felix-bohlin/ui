<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Radio,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Spot on stage</FieldLegend>
    <FieldGroup orientation="horizontal">
      <Radio defaultChecked name="radio-group-orientation" value="front"
        >Front</Radio
      >
      <Radio name="radio-group-orientation" value="middle">Middle</Radio>
      <Radio name="radio-group-orientation" value="amp">Behind the amp</Radio>
    </FieldGroup>
  </Fieldset>
</Form>
