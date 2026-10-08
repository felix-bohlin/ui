<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<div class="example-row ui-spacious">
  <Checkbox required name="checkbox-validation">Default</Checkbox>
  <Checkbox stack required name="checkbox-validation">Stack</Checkbox>
</div>
<div class="example-row ui-spacious">
  <Checkbox error checked name="checkbox-validation">
    Default
    {#snippet endText()}Check yourself{/snippet}
  </Checkbox>
  <Checkbox stack error name="checkbox-validation">
    Stack
    {#snippet endText()}Before you wreck yourself{/snippet}
  </Checkbox>
</div>
