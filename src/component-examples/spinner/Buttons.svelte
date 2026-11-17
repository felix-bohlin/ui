<script lang="ts">
  import { Button } from "opui-css/svelte"
</script>

<div class="example-row">
  <Button aria-busy="true" variant="filled">Save</Button>
  <Button aria-busy="true" disabled variant="outlined">Upload</Button>
  <Button aria-busy="true">Send</Button>
</div>

<div class="example-row">
  <Button aria-busy="true" variant="filled">
    <span class="ui-sr-only">Save</span>
  </Button>
  <Button aria-busy="true" disabled variant="outlined">
    <span class="ui-sr-only">Upload</span>
  </Button>
  <Button aria-busy="true">
    <span class="ui-sr-only">Send</span>
  </Button>
</div>
