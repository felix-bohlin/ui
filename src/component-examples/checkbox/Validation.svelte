<script lang="ts">
  import { Checkbox } from "@opui/svelte"
</script>

<div class="example-row spacious">
  <Checkbox required name="checkbox">Default</Checkbox>
  <Checkbox stack required name="checkbox">Stack</Checkbox>
</div>
<div class="example-row spacious">
  <Checkbox critical checked name="checkbox">
    Default
    {#snippet endText()}Check yourself{/snippet}
  </Checkbox>
  <Checkbox stack critical name="checkbox">
    Stack
    {#snippet endText()}Before you wreck yourself{/snippet}
  </Checkbox>
</div>
