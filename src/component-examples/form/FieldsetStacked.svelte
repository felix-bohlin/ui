<script lang="ts">
  import { FieldDescription } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Radio } from "@opui/svelte"
</script>

<FieldSet>
  <FieldLegend>Favorite Pet</FieldLegend>
  <FieldDescription>Please select your favorite type of pet.</FieldDescription>
  <FieldGroup name="pet">
    <Radio value="dog">Dog</Radio>
    <Radio value="cat">Cat</Radio>
    <Radio value="hamster">Hamster</Radio>
  </FieldGroup>
</FieldSet>
