<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField
  label="Users"
  list="text-field-autosuggest-1-list"
  placeholder="Search people"
>
  <datalist id="text-field-autosuggest-1-list">
    <option value="Elif Rahman"></option>
    <option value="Lena Ek"></option>
    <option value="Tom Tanaka"></option>
  </datalist>
</TextField>

<TextField
  label="Emails"
  list="text-field-autosuggest-2-list"
  placeholder="name@example.com"
  type="email"
  variant="filled"
>
  <datalist id="text-field-autosuggest-2-list">
    <option value="elif.rahman@example.com"></option>
    <option value="lena.ek@example.com"></option>
    <option value="tom.tanaka@example.com"></option>
  </datalist>
</TextField>
