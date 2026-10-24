<script lang="ts">
  import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Radio,
  } from "opui-css/svelte"
</script>

<Fieldset>
  <FieldLegend>Favorite Pet</FieldLegend>
  <FieldDescription>Please select your favorite type of pet.</FieldDescription>
  <FieldGroup name="pet">
    <Radio value="cat">Cat</Radio>
    <Radio value="dog">Dog</Radio>
    <Radio value="hamster">Hamster</Radio>
  </FieldGroup>
</Fieldset>
