<script lang="ts">
  import { Checkbox } from "@opui/svelte"
</script>

<Checkbox class="anatomy" checked>
  Label
  {#snippet endText()}
    End text
  {/snippet}
</Checkbox>
