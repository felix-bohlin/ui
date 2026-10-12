<script lang="ts">
  import {
    Checkbox,
    CheckboxEndText,
    CheckboxInput,
    CheckboxLabel,
  } from "opui-css/svelte"
</script>

<div class="example-row ui-spacious">
  <Checkbox>
    <CheckboxInput required name="checkbox-validation" />
    <CheckboxLabel>Default</CheckboxLabel>
  </Checkbox>
  <Checkbox stack>
    <CheckboxInput required name="checkbox-validation" />
    <CheckboxLabel>Stack</CheckboxLabel>
  </Checkbox>
</div>
<div class="example-row ui-spacious">
  <Checkbox error>
    <CheckboxInput checked name="checkbox-validation" />
    <CheckboxLabel>Default</CheckboxLabel>
    <CheckboxEndText>Check yourself</CheckboxEndText>
  </Checkbox>
  <Checkbox stack error>
    <CheckboxInput name="checkbox-validation" />
    <CheckboxLabel>Stack</CheckboxLabel>
    <CheckboxEndText>Before you wreck yourself</CheckboxEndText>
  </Checkbox>
</div>
