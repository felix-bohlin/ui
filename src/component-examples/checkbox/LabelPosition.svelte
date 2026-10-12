<script lang="ts">
  import { Checkbox, CheckboxInput, CheckboxLabel } from "opui-css/svelte"
</script>

<Checkbox>
  <CheckboxInput name="checkbox-label-position" />
  <CheckboxLabel>Default</CheckboxLabel>
</Checkbox>
<Checkbox stack>
  <CheckboxInput name="checkbox-label-position" />
  <CheckboxLabel>Stack</CheckboxLabel>
</Checkbox>
