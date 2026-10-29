<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<div class="example-row">
  <Textarea label="Label" placeholder="Default" required />
  <Textarea label="Label" placeholder="Filled" required variant="filled" />
</div>

<div class="example-row">
  <Textarea
    label="Label"
    placeholder="Default"
    value="This isn't right"
    endText="Only double-negatives are allowed."
    error
  />
  <Textarea
    label="Label"
    placeholder="Filled"
    value="Uh-oh"
    endText="Only letters from the first half of the alphabet are allowed."
    error
    variant="filled"
  />
</div>
