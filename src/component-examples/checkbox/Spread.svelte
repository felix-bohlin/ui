<script lang="ts">
  import { Checkbox } from "@opui/svelte"
</script>

<Checkbox spread>
  Accept Terms & Conditions
  {#snippet endText()}
    I have read and agree to the privacy policy.
  {/snippet}
</Checkbox>

<Checkbox spread required>
  Required
  {#snippet endText()}
    You must accept this to continue.
  {/snippet}
</Checkbox>

<Checkbox spread disabled>
  Disabled
  {#snippet endText()}
    This checkbox is disabled.
  {/snippet}
</Checkbox>

<Checkbox spread critical>
  Invalid Checkbox
  {#snippet endText()}
    There is an error with this checkbox.
  {/snippet}
</Checkbox>
-->
