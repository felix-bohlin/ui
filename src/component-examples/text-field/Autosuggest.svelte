<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField
  id="text-field-autosuggest-1"
  label="Bassists"
  list="text-field-autosuggest-1-list"
  placeholder="Search bassists"
>
  <datalist id="text-field-autosuggest-1-list">
    <option value="Ines Hertz"></option>
    <option value="Lou Headstock"></option>
    <option value="Percy Groove"></option>
  </datalist>
</TextField>

<TextField
  id="text-field-autosuggest-2"
  label="Emails"
  list="text-field-autosuggest-2-list"
  placeholder="name@lowend.example"
  type="email"
  variant="filled"
>
  <datalist id="text-field-autosuggest-2-list">
    <option value="ines@lowend.example"></option>
    <option value="lou@lowend.example"></option>
    <option value="percy@lowend.example"></option>
  </datalist>
</TextField>
