<script lang="ts">
  import { Checkbox, CheckboxInput, CheckboxLabel } from "opui-css/svelte"
</script>

<Checkbox>
  <CheckboxInput checked name="checkbox-visible-label" />
  <CheckboxLabel>Choice A</CheckboxLabel>
</Checkbox>
<Checkbox>
  <CheckboxInput disabled name="checkbox-visible-label" />
  <CheckboxLabel>Disabled</CheckboxLabel>
</Checkbox>
<Checkbox>
  <CheckboxInput checked disabled name="checkbox-visible-label" />
  <CheckboxLabel>Checked and disabled</CheckboxLabel>
</Checkbox>
<Checkbox>
  <CheckboxInput name="checkbox-visible-label" />
  <CheckboxLabel>
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </CheckboxLabel>
</Checkbox>
