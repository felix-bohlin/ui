<script lang="ts">
  import { Button, ControlGroup, TextField } from "opui-css/svelte"
</script>

<ControlGroup variant="outlined">
  <TextField label="Discount code" name="discount" value="SPRING10" />
  <Button>Apply</Button>
</ControlGroup>
