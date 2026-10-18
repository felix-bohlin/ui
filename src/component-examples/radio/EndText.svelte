<script lang="ts">
  import { Radio } from "opui-css/svelte"
</script>

<Radio name="radio-end-text" value="default" checked>
  Default
  {#snippet endText()}Supporting text{/snippet}
</Radio>
<Radio name="radio-end-text" value="stack" stack>
  Stack
  {#snippet endText()}Supporting text{/snippet}
</Radio>
