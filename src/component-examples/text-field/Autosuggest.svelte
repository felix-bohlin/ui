<script lang="ts">
  import { Field } from "opui-css/svelte"
</script>

<Field for="text-field-autosuggest-1" label="Bassists">
  <input
    id="text-field-autosuggest-1"
    list="text-field-autosuggest-1-list"
    placeholder="Search bassists"
  />
  <datalist id="text-field-autosuggest-1-list">
    <option value="Ines Hertz"></option>
    <option value="Lou Headstock"></option>
    <option value="Percy Groove"></option>
  </datalist>
</Field>

<Field for="text-field-autosuggest-2" label="Emails" variant="filled">
  <input
    id="text-field-autosuggest-2"
    list="text-field-autosuggest-2-list"
    placeholder="name@bassmail.example"
    type="email"
  />
  <datalist id="text-field-autosuggest-2-list">
    <option value="ines@bassmail.example"></option>
    <option value="lou@bassmail.example"></option>
    <option value="percy@bassmail.example"></option>
  </datalist>
</Field>
