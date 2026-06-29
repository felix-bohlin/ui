<script lang="ts">
  import { TextField } from "@opui/svelte"
</script>

<div class="example-row">
  <TextField label="I'm required" placeholder="Placeholder" required />
  <TextField label="So am I!" placeholder="Placeholder" required filled />
</div>

<div class="example-row">
  <TextField
    label="Label"
    placeholder="Placeholder"
    value="This isn't right"
    endText="Only double-negatives are allowed."
    critical
  />
  <TextField
    label="Label"
    placeholder="Placeholder"
    value="Uh-oh"
    endText="Only letters from the first half of the alphabet are allowed."
    critical
    filled
  />
</div>
