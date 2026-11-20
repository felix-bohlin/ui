<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<TextField
  dropZone
  endText="PDF, PNG or JPG, up to 10 MB."
  for="text-field-drop-zone-1"
  label="Receipt"
>
  <input
    accept=".pdf,.png,.jpg"
    aria-describedby="text-field-drop-zone-1-end-text"
    id="text-field-drop-zone-1"
    type="file"
  />
</TextField>
