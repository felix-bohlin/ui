<script lang="ts">
  import { Button, Dialog } from "opui-css/svelte"
</script>

<Button commandfor="example-dialog" command="show-modal" variant="outlined">
  Open dialog
</Button>

<Dialog id="example-dialog">
  {#snippet header()}<h2 class="ui-h4">Newsletter</h2>{/snippet}
  {#snippet content()}<p>
      Get a short email when we ship something new. No more than once a month.
    </p>{/snippet}
  {#snippet actions()}
    <Button commandfor="example-dialog" command="close" type="button">
      Not now
    </Button>
    <Button
      commandfor="example-dialog"
      command="close"
      type="button"
      variant="filled"
    >
      Subscribe
    </Button>
  {/snippet}
</Dialog>
