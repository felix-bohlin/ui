<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField
  id="text-field-autosuggest-1"
  label="Users"
  list="text-field-autosuggest-1-list"
  placeholder="Search people"
>
  <datalist id="text-field-autosuggest-1-list">
    <option value="Inga Halonen"></option>
    <option value="Lena Handén"></option>
    <option value="Pekka Gåpåbottanen"></option>
  </datalist>
</TextField>

<TextField
  id="text-field-autosuggest-2"
  label="Emails"
  list="text-field-autosuggest-2-list"
  placeholder="name@example.com"
  type="email"
  variant="filled"
>
  <datalist id="text-field-autosuggest-2-list">
    <option value="inga.halonen@example.com"></option>
    <option value="lena.handen@example.com"></option>
    <option value="pekka.gapabottanen@example.com"></option>
  </datalist>
</TextField>
